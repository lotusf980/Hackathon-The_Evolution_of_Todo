from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlmodel import Session, select
from typing import Annotated, List
from database.database import get_session
from models.task import Task, TaskCreate, TaskRead, TaskUpdate, TaskPatch
from models.user import User
from auth.jwt_handler import get_current_user
from utils.validators import validate_task_creation, validate_task_update, validate_user_ownership, check_user_exists

router = APIRouter(tags=["tasks"])


@router.get("/{user_id}/tasks", response_model=dict)
async def get_tasks(
    user_id: str,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)],
    status: str = Query("all", description="Filter by status: all, pending, completed"),
    sort: str = Query("created", description="Sort by field: created, title")
):
    """
    Retrieve all tasks for the authenticated user.
    """
    # Verify that the requested user_id matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access these tasks"
        )

    # Build query based on filters
    query = select(Task).where(Task.user_id == user_id)

    if status != "all":
        if status == "pending":
            query = query.where(Task.completed == False)
        elif status == "completed":
            query = query.where(Task.completed == True)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid status filter. Use 'all', 'pending', or 'completed'."
            )

    # Apply sorting
    if sort == "title":
        query = query.order_by(Task.title)
    elif sort == "created":
        query = query.order_by(Task.created_at.desc())
    # Default is already by creation date descending

    tasks = session.exec(query).all()

    # Convert to response format
    task_list = []
    for task in tasks:
        task_dict = {
            "id": task.id,
            "user_id": task.user_id,
            "title": task.title,
            "description": task.description,
            "completed": task.completed,
            "created_at": task.created_at.isoformat(),
            "updated_at": task.updated_at.isoformat()
        }
        task_list.append(task_dict)

    return {"tasks": task_list, "count": len(task_list)}


@router.post("/{user_id}/tasks", response_model=TaskRead)
async def create_task(
    user_id: str,
    task: TaskCreate,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Create a new task for the authenticated user.
    """
    # Verify that the user_id in the path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create tasks for this user"
        )

    # Validate task data
    validate_task_creation(task)

    # Verify user exists
    check_user_exists(session, user_id)

    # Create the task
    db_task = Task(
        title=task.title,
        description=task.description,
        user_id=user_id,
        completed=False
    )

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.get("/{user_id}/tasks/{id}", response_model=TaskRead)
async def get_task(
    user_id: str,
    id: int,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Retrieve a specific task for the authenticated user.
    """
    # Verify that the user_id in the path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this task"
        )

    # Fetch the task
    task = session.get(Task, id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify that the task belongs to the user
    validate_user_ownership(user_id, task.user_id)

    return task


@router.put("/{user_id}/tasks/{id}", response_model=TaskRead)
async def update_task(
    user_id: str,
    id: int,
    task_update: TaskUpdate,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Update a specific task for the authenticated user.
    """
    # Verify that the user_id in the path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    # Fetch the task
    db_task = session.get(Task, id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify that the task belongs to the user
    validate_user_ownership(user_id, db_task.user_id)

    # Validate task update data
    validate_task_update(task_update)

    # Update the task
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db_task.updated_at = type(db_task).updated_at.default.arg()  # Update the timestamp

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.delete("/{user_id}/tasks/{id}")
async def delete_task(
    user_id: str,
    id: int,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Delete a specific task for the authenticated user.
    """
    # Verify that the user_id in the path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this task"
        )

    # Fetch the task
    db_task = session.get(Task, id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify that the task belongs to the user
    validate_user_ownership(user_id, db_task.user_id)

    # Delete the task
    session.delete(db_task)
    session.commit()

    return {"message": "Task deleted successfully", "deleted_task_id": id}


@router.patch("/{user_id}/tasks/{id}/complete", response_model=TaskRead)
async def toggle_task_completion(
    user_id: str,
    id: int,
    task_patch: TaskPatch,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Toggle the completion status of a specific task for the authenticated user.
    """
    # Verify that the user_id in the path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    # Fetch the task
    db_task = session.get(Task, id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify that the task belongs to the user
    validate_user_ownership(user_id, db_task.user_id)

    # Toggle the completion status
    db_task.completed = task_patch.completed
    db_task.updated_at = type(db_task).updated_at.default.arg()  # Update the timestamp

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task