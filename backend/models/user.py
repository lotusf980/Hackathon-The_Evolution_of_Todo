from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
import uuid


class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False, max_length=255)
    name: str = Field(nullable=False, max_length=100)


class User(UserBase, table=True):
    """
    User model representing a registered user in the system.
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    password: str = Field(nullable=False)  # This will store the hashed password
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to tasks
    tasks: List["Task"] = Relationship(back_populates="user")


class UserRead(UserBase):
    """
    Schema for reading user data (without sensitive information).
    """
    id: str
    created_at: datetime


class UserCreate(UserBase):
    """
    Schema for creating a new user.
    """
    password: str


class UserUpdate(SQLModel):
    """
    Schema for updating user information.
    """
    email: Optional[str] = None
    name: Optional[str] = None