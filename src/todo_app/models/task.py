from datetime import datetime
from typing import Optional


class Task:
    """
    Represents a todo task with title, description, and completion status.

    Attributes:
        id (int): Unique identifier for the task
        title (str): Title of the task (1-200 characters)
        description (str): Optional description of the task (0-1000 characters)
        completed (bool): Indicates if the task is completed (default: False)
        created_at (datetime): Timestamp when the task was created
    """

    def __init__(self, task_id: int, title: str, description: Optional[str] = None, completed: bool = False):
        """
        Initialize a new Task instance.

        Args:
            task_id (int): Unique identifier for the task
            title (str): Title of the task (1-200 characters)
            description (str, optional): Description of the task (0-1000 characters)
            completed (bool): Whether the task is completed (default: False)

        Raises:
            ValueError: If title length is not between 1-200 characters
        """
        self.id = task_id
        self.title = title
        self.description = description if description is not None else ""
        self.completed = completed
        self.created_at = datetime.now()

        # Validate title length
        if len(title) < 1 or len(title) > 200:
            raise ValueError(f"Title must be between 1 and 200 characters, got {len(title)}")

        # Validate description length if provided
        if description and len(description) > 1000:
            raise ValueError(f"Description must be 1000 characters or less, got {len(description)}")

    def to_dict(self) -> dict:
        """
        Convert the Task instance to a dictionary representation.

        Returns:
            dict: Dictionary representation of the task
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "created_at": self.created_at.isoformat()
        }

    @classmethod
    def from_dict(cls, data: dict):
        """
        Create a Task instance from a dictionary.

        Args:
            data (dict): Dictionary containing task data

        Returns:
            Task: New Task instance
        """
        # Convert ISO format datetime string back to datetime object
        created_at = datetime.fromisoformat(data["created_at"]) if isinstance(data["created_at"], str) else data["created_at"]

        task = cls(
            task_id=data["id"],
            title=data["title"],
            description=data.get("description", ""),
            completed=data.get("completed", False)
        )
        task.created_at = created_at
        return task

    def validate(self) -> bool:
        """
        Validate the task attributes.

        Returns:
            bool: True if task is valid, False otherwise
        """
        try:
            # Validate title
            if not isinstance(self.title, str) or len(self.title) < 1 or len(self.title) > 200:
                return False

            # Validate description if present
            if self.description and len(self.description) > 1000:
                return False

            # Validate completed status
            if not isinstance(self.completed, bool):
                return False

            return True
        except Exception:
            return False

    def toggle_completion(self) -> bool:
        """
        Toggle the completion status of the task.

        Returns:
            bool: New completion status
        """
        self.completed = not self.completed
        return self.completed

    def __str__(self) -> str:
        """
        String representation of the task.

        Returns:
            str: Formatted string representation
        """
        status = "✓" if self.completed else "○"
        return f"[{status}] ID: {self.id}, Title: {self.title}, Description: {self.description[:50]}{'...' if len(self.description) > 50 else ''}"

    def __repr__(self) -> str:
        """
        Developer-friendly representation of the task.

        Returns:
            str: Detailed string representation
        """
        return f"Task(id={self.id}, title='{self.title}', completed={self.completed})"