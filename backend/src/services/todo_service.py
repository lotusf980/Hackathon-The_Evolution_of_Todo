"""
Todo Service
Todo CRUD operations with user isolation
"""

from sqlmodel import Session, select
from typing import List, Optional
from ..models.todo import Todo
from ..schemas.todo import TodoCreate, TodoUpdate


def create_todo(db: Session, todo_data: TodoCreate, user_id: str) -> Todo:
    """
    Create a new todo
    
    Args:
        db: Database session
        todo_data: Todo creation data
        user_id: ID of the user creating the todo
        
    Returns:
        Created todo
    """
    todo = Todo(
        title=todo_data.title,
        notes=todo_data.notes,
        due_date=todo_data.due_date,
        user_id=user_id,
    )
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    
    return todo


def get_todos_by_user(db: Session, user_id: str) -> List[Todo]:
    """
    Get all todos for a user, sorted by created_at DESC
    
    Args:
        db: Database session
        user_id: ID of the user
        
    Returns:
        List of todos owned by the user
    """
    todos = db.exec(
        select(Todo)
        .where(Todo.user_id == user_id)
        .order_by(Todo.created_at.desc())
    ).all()
    
    return todos


def get_todo_by_id(db: Session, todo_id: str, user_id: str) -> Optional[Todo]:
    """
    Get a todo by ID, ensuring it belongs to the user
    
    Args:
        db: Database session
        todo_id: ID of the todo
        user_id: ID of the user
        
    Returns:
        Todo if found and owned by user, None otherwise
    """
    todo = db.exec(
        select(Todo).where(Todo.id == todo_id, Todo.user_id == user_id)
    ).first()
    
    return todo


def update_todo(
    db: Session,
    todo_id: str,
    user_id: str,
    todo_data: TodoUpdate
) -> Optional[Todo]:
    """
    Update a todo
    
    Args:
        db: Database session
        todo_id: ID of the todo
        user_id: ID of the user
        todo_data: Update data
        
    Returns:
        Updated todo if found and owned by user, None otherwise
    """
    todo = get_todo_by_id(db, todo_id, user_id)
    
    if not todo:
        return None
    
    # Update only provided fields
    update_data = todo_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(todo, field, value)
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    
    return todo


def toggle_complete(
    db: Session,
    todo_id: str,
    user_id: str,
    completed: bool
) -> Optional[Todo]:
    """
    Toggle todo completion status
    
    Args:
        db: Database session
        todo_id: ID of the todo
        user_id: ID of the user
        completed: Completion status
        
    Returns:
        Updated todo if found and owned by user, None otherwise
    """
    todo = get_todo_by_id(db, todo_id, user_id)
    
    if not todo:
        return None
    
    todo.completed = completed
    db.add(todo)
    db.commit()
    db.refresh(todo)
    
    return todo


def delete_todo(db: Session, todo_id: str, user_id: str) -> bool:
    """
    Delete a todo
    
    Args:
        db: Database session
        todo_id: ID of the todo
        user_id: ID of the user
        
    Returns:
        True if deleted, False if not found or not owned by user
    """
    todo = get_todo_by_id(db, todo_id, user_id)
    
    if not todo:
        return False
    
    db.delete(todo)
    db.commit()
    
    return True
