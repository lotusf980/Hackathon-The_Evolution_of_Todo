from typing import Optional
from pydantic import BaseModel, validator
from models.task import TaskCreate, TaskUpdate
from sqlmodel import Session
from models.user import User


def validate_task_creation(task_data: TaskCreate) -> bool:
    """
    Validate task creation data.

    Args:
        task_data: Task creation data

    Returns:
        bool: True if data is valid, raises exception if not
    """
    # Validate title length
    if not (1 <= len(task_data.title) <= 200):
        raise ValueError(f"Title must be between 1 and 200 characters, got {len(task_data.title)}")

    # Validate description length if provided
    if task_data.description and len(task_data.description) > 1000:
        raise ValueError(f"Description must be 1000 characters or less, got {len(task_data.description)}")

    return True


def validate_task_update(task_data: TaskUpdate) -> bool:
    """
    Validate task update data.

    Args:
        task_data: Task update data

    Returns:
        bool: True if data is valid, raises exception if not
    """
    # Validate title length if provided
    if task_data.title and not (1 <= len(task_data.title) <= 200):
        raise ValueError(f"Title must be between 1 and 200 characters, got {len(task_data.title)}")

    # Validate description length if provided
    if task_data.description and len(task_data.description) > 1000:
        raise ValueError(f"Description must be 1000 characters or less, got {len(task_data.description)}")

    return True


def validate_user_ownership(user_id: str, resource_user_id: str) -> bool:
    """
    Validate that a user owns a particular resource.

    Args:
        user_id: ID of the authenticated user
        resource_user_id: ID of the user who owns the resource

    Returns:
        bool: True if user owns the resource, raises exception if not
    """
    if user_id != resource_user_id:
        raise ValueError("User does not have permission to access this resource")

    return True


def validate_email_format(email: str) -> bool:
    """
    Validate email format.

    Args:
        email: Email string to validate

    Returns:
        bool: True if email is valid format, raises exception if not
    """
    import re

    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        raise ValueError("Invalid email format")

    return True


def check_user_exists(session: Session, user_id: str) -> bool:
    """
    Check if a user exists in the database.

    Args:
        session: Database session
        user_id: ID of the user to check

    Returns:
        bool: True if user exists, raises exception if not
    """
    from models.user import User
    user = session.get(User, user_id)
    if not user:
        raise ValueError("User does not exist")

    return True