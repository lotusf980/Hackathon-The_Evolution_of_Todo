"""
Todo Schemas
Request/response models for todo endpoints
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TodoBase(BaseModel):
    """Base todo schema"""
    title: str = Field(..., min_length=1, max_length=200)
    notes: Optional[str] = Field(None, max_length=1000)
    due_date: Optional[str] = None


class TodoCreate(TodoBase):
    """Schema for creating a todo"""
    pass


class TodoUpdate(BaseModel):
    """Schema for updating a todo"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    notes: Optional[str] = Field(None, max_length=1000)
    due_date: Optional[str] = None
    completed: Optional[bool] = None


class TodoResponse(TodoBase):
    """Schema for todo response"""
    id: str
    completed: bool
    created_at: datetime
    updated_at: datetime
    user_id: str
    
    class Config:
        from_attributes = True


class TodosResponse(BaseModel):
    """Schema for list of todos"""
    todos: list[TodoResponse]


class SuccessResponse(BaseModel):
    """Schema for success response"""
    success: bool
    message: Optional[str] = None
