from typing import List, Optional, Dict
from datetime import datetime
from ..models.task import Task


class TaskStore:
    """
    In-memory storage for tasks.
    """

    def __init__(self):
        """Initialize an empty task store."""
        self._tasks: Dict[int, Task] = {}
        self._next_id = 1

    def add_task(self, task: Task) -> Task:
        """
        Add a task to the store.

        Args:
            task (Task): The task to add

        Returns:
            Task: The added task with assigned ID
        """
        if task.id is None:
            task.id = self._next_id
            self._next_id += 1
        else:
            # If task has an ID, make sure _next_id is updated if needed
            if task.id >= self._next_id:
                self._next_id = task.id + 1

        self._tasks[task.id] = task
        return task

    def get_task(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id (int): The ID of the task to retrieve

        Returns:
            Optional[Task]: The task if found, None otherwise
        """
        return self._tasks.get(task_id)

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks in the store.

        Returns:
            List[Task]: List of all tasks
        """
        return list(self._tasks.values())

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        """
        Update a task's title or description.

        Args:
            task_id (int): The ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            Optional[Task]: The updated task if successful, None if task not found
        """
        task = self.get_task(task_id)
        if not task:
            return None

        if title is not None:
            task.title = title
        if description is not None:
            task.description = description

        return task

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id (int): The ID of the task to delete

        Returns:
            bool: True if the task was deleted, False if not found
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

    def toggle_completion(self, task_id: int) -> Optional[Task]:
        """
        Toggle the completion status of a task.

        Args:
            task_id (int): The ID of the task to toggle

        Returns:
            Optional[Task]: The updated task if successful, None if task not found
        """
        task = self.get_task(task_id)
        if not task:
            return None

        task.toggle_completion()
        return task

    def get_next_id(self) -> int:
        """
        Get the next available ID for a new task.

        Returns:
            int: The next available ID
        """
        return self._next_id


class TaskService:
    """
    Service layer for managing tasks.
    """

    def __init__(self):
        """Initialize the task service with an in-memory store."""
        self.store = TaskStore()

    def add_task(self, title: str, description: Optional[str] = None, completed: bool = False) -> Task:
        """
        Add a new task with the given title and description.

        Args:
            title (str): Title of the task (1-200 characters)
            description (str, optional): Description of the task (0-1000 characters)
            completed (bool, optional): Whether the task is completed (default: False)

        Returns:
            Task: The newly created task

        Raises:
            ValueError: If title doesn't meet validation requirements
        """
        # Validate title length
        if not title or len(title) < 1 or len(title) > 200:
            raise ValueError(f"Title must be between 1 and 200 characters, got {len(title) if title else 0}")

        # Validate description length if provided
        if description and len(description) > 1000:
            raise ValueError(f"Description must be 1000 characters or less, got {len(description)}")

        # Create a new task with the next available ID
        task_id = self.store.get_next_id()
        task = Task(task_id=task_id, title=title, description=description, completed=completed)

        return self.store.add_task(task)

    def get_task(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id (int): The ID of the task to retrieve

        Returns:
            Optional[Task]: The task if found, None otherwise
        """
        return self.store.get_task(task_id)

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks.

        Returns:
            List[Task]: List of all tasks
        """
        return self.store.get_all_tasks()

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        """
        Update a task's title or description while preserving completion status.

        Args:
            task_id (int): The ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            Optional[Task]: The updated task if successful, None if task not found
        """
        return self.store.update_task(task_id, title, description)

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id (int): The ID of the task to delete

        Returns:
            bool: True if the task was deleted, False if not found
        """
        return self.store.delete_task(task_id)

    def toggle_completion(self, task_id: int) -> Optional[Task]:
        """
        Toggle the completion status of a task.

        Args:
            task_id (int): The ID of the task to toggle

        Returns:
            Optional[Task]: The updated task if successful, None if task not found
        """
        return self.store.toggle_completion(task_id)

    def get_next_available_id(self) -> int:
        """
        Get the next available ID for a new task.

        Returns:
            int: The next available ID
        """
        return self.store._next_id