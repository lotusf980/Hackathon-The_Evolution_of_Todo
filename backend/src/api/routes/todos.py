"""
Todo Routes
CRUD operations for todos with user isolation
"""

from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlmodel import Session
from typing import List

from ...core.database import get_db
from ...api.deps import get_current_user_id
from ...schemas.todo import TodoCreate, TodoUpdate, TodoResponse, TodosResponse, SuccessResponse
from ...services.todo_service import (
    create_todo,
    get_todos_by_user,
    get_todo_by_id,
    update_todo,
    toggle_complete,
    delete_todo,
)

from pydantic import BaseModel

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.post("", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo_endpoint(
    todo_data: TodoCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Create a new todo"""
    todo = create_todo(db, todo_data, user_id)
    
    return TodoResponse(
        id=todo.id,
        title=todo.title,
        notes=todo.notes,
        due_date=todo.due_date,
        completed=todo.completed,
        created_at=todo.created_at,
        updated_at=todo.updated_at,
        user_id=todo.user_id,
    )


@router.get("", response_model=TodosResponse)
async def list_todos_endpoint(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """List all todos for the authenticated user"""
    todos = get_todos_by_user(db, user_id)
    
    return TodosResponse(
        todos=[
            TodoResponse(
                id=todo.id,
                title=todo.title,
                notes=todo.notes,
                due_date=todo.due_date,
                completed=todo.completed,
                created_at=todo.created_at,
                updated_at=todo.updated_at,
                user_id=todo.user_id,
            )
            for todo in todos
        ]
    )


@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo_endpoint(
    todo_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Get a specific todo by ID"""
    todo = get_todo_by_id(db, todo_id, user_id)
    
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    
    return TodoResponse(
        id=todo.id,
        title=todo.title,
        notes=todo.notes,
        due_date=todo.due_date,
        completed=todo.completed,
        created_at=todo.created_at,
        updated_at=todo.updated_at,
        user_id=todo.user_id,
    )


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo_endpoint(
    todo_id: str,
    todo_data: TodoUpdate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Update an existing todo"""
    todo = update_todo(db, todo_id, user_id, todo_data)
    
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    
    return TodoResponse(
        id=todo.id,
        title=todo.title,
        notes=todo.notes,
        due_date=todo.due_date,
        completed=todo.completed,
        created_at=todo.created_at,
        updated_at=todo.updated_at,
        user_id=todo.user_id,
    )


@router.patch("/{todo_id}/complete", response_model=TodoResponse)
async def toggle_complete_endpoint(
    todo_id: str,
    completed: bool = Body(..., embed=True),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Toggle todo completion status"""
    todo = toggle_complete(db, todo_id, user_id, completed)
    
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    
    return TodoResponse(
        id=todo.id,
        title=todo.title,
        notes=todo.notes,
        due_date=todo.due_date,
        completed=todo.completed,
        created_at=todo.created_at,
        updated_at=todo.updated_at,
        user_id=todo.user_id,
    )


@router.delete("/{todo_id}", response_model=SuccessResponse)
async def delete_todo_endpoint(
    todo_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Delete a todo permanently"""
    success = delete_todo(db, todo_id, user_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    
    return SuccessResponse(success=True, message="Todo deleted successfully")
