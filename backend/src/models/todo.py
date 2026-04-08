"""
Todo Model
Represents a task/todo item owned by a user
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional
from datetime import datetime
import uuid

if TYPE_CHECKING:
    from .user import User


class Todo(SQLModel, table=True):
    """Todo model with user ownership"""
    
    __tablename__ = "todos"
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    title: str = Field(nullable=False, max_length=200)
    notes: Optional[str] = Field(default=None, max_length=1000)
    due_date: Optional[str] = Field(default=None, max_length=10)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Foreign key to user (enforces user isolation)
    user_id: str = Field(foreign_key="users.id", nullable=False, index=True)
    
    # Relationship to owner
    owner: "User" = Relationship(back_populates="todos")
    
    def __repr__(self):
        return f"<Todo(id={self.id}, title={self.title}, completed={self.completed})>"
