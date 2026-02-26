"""
Todo domain logic and data models.

This module contains the core business logic for the Todo application,
including the Task dataclass and TodoList manager class.
"""

from dataclasses import dataclass, field


@dataclass
class Task:
    """
    Represents a single todo item.

    Attributes:
        id: Unique, sequential integer identifier (auto-assigned, starts at 1).
        title: Non-empty string (required, trimmed).
        description: String (optional, can be empty, trimmed).
        completed: Boolean flag indicating completion status (defaults to False).
    """

    id: int
    title: str
    description: str
    completed: bool = False


class TodoList:
    """
    In-memory task manager.

    Manages a collection of Task objects with auto-incrementing IDs.
    Tasks are stored in memory only and lost on application exit.

    Attributes:
        _tasks: Internal list storing Task objects.
        _next_id: Counter for assigning the next task ID.
    """

    def __init__(self) -> None:
        """Initialize an empty task list with next ID starting at 1."""
        self._tasks: list[Task] = []
        self._next_id: int = 1

    def add_task(self, title: str, description: str = "") -> Task:
        """
        Add a new task to the todo list.

        Args:
            title: Task title (required, non-empty after trimming).
            description: Task description (optional, defaults to empty string).

        Returns:
            The newly created Task with assigned ID.

        Raises:
            ValueError: If title is empty after trimming.

        Notes:
            - Trims leading/trailing whitespace from title and description.
            - Auto-assigns sequential ID starting from 1.
            - Sets completed status to False by default.
        """
        # Trim whitespace
        trimmed_title = title.strip()
        trimmed_description = description.strip()

        # Validate title is not empty
        if not trimmed_title:
            raise ValueError("Task title cannot be empty.")

        # Create task with auto-assigned ID
        task = Task(
            id=self._next_id,
            title=trimmed_title,
            description=trimmed_description,
            completed=False,
        )

        # Add to list and increment next ID
        self._tasks.append(task)
        self._next_id += 1

        return task

    def get_all_tasks(self) -> list[Task]:
        """
        Get all tasks in the todo list.

        Returns:
            List of all Task objects in ascending ID order.
        """
        return self._tasks.copy()

    def get_task_by_id(self, task_id: int) -> Task | None:
        """
        Get a task by its ID.

        Args:
            task_id: The ID of the task to find.

        Returns:
            The Task if found, None otherwise.
        """
        for task in self._tasks:
            if task.id == task_id:
                return task
        return None

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id: ID of task to delete.

        Returns:
            True if task was found and deleted, False otherwise.

        Notes:
            - Does NOT renumber remaining tasks.
            - IDs remain unchanged after deletion.
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return False

        self._tasks.remove(task)
        return True

    def update_task(
        self,
        task_id: int,
        title: str | None = None,
        description: str | None = None
    ) -> bool:
        """
        Update task title and/or description by ID.

        Args:
            task_id: ID of task to update.
            title: New title (None to keep current).
            description: New description (None to keep current).

        Returns:
            True if task was found and updated, False otherwise.

        Raises:
            ValueError: If new title is empty after trimming.

        Notes:
            - None values preserve existing field.
            - Empty string ("") is valid for description.
            - Empty string ("") is INVALID for title (raises ValueError).
            - Does NOT modify id or completed fields.
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return False

        # Update title if provided
        if title is not None:
            trimmed_title = title.strip()
            if not trimmed_title:
                raise ValueError("Task title cannot be empty.")
            task.title = trimmed_title

        # Update description if provided
        if description is not None:
            task.description = description.strip()

        return True

    def toggle_complete(self, task_id: int) -> bool | None:
        """
        Toggle task completion status by ID.

        Args:
            task_id: ID of task to toggle.

        Returns:
            New completion status (True/False) if successful,
            None if task not found.

        Notes:
            - Flips completed: False -> True, True -> False.
            - Does NOT modify id, title, or description.
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return None

        task.completed = not task.completed
        return task.completed
