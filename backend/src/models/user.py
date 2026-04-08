"""
User Model
Represents an authenticated user in the system
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING
from datetime import datetime
import uuid


class User(SQLModel, table=True):
    """User model for authentication"""
    
    __tablename__ = "users"
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    email: str = Field(unique=True, index=True, nullable=False, max_length=255)
    hashed_password: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationship to todos
    todos: list["Todo"] = Relationship(back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email})>"
