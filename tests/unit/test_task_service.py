import pytest
from src.todo_app.services.task_service import TaskService
from src.todo_app.models.task import Task


class TestTaskService:
    """Unit tests for the TaskService."""

    def test_add_task_success(self):
        """Test adding a valid task."""
        service = TaskService()

        task = service.add_task(title="Test Task", description="Test Description")

        assert task.id == 1
        assert task.title == "Test Task"
        assert task.description == "Test Description"
        assert task.completed is False

    def test_add_task_without_description(self):
        """Test adding a task without description."""
        service = TaskService()

        task = service.add_task(title="Test Task")

        assert task.id == 1
        assert task.title == "Test Task"
        assert task.description == ""
        assert task.completed is False

    def test_add_task_min_title_length(self):
        """Test adding a task with minimum title length."""
        service = TaskService()

        task = service.add_task(title="A")

        assert task.title == "A"

    def test_add_task_max_title_length(self):
        """Test adding a task with maximum title length."""
        long_title = "A" * 200
        service = TaskService()

        task = service.add_task(title=long_title)

        assert task.title == long_title
        assert len(task.title) == 200

    def test_add_task_title_too_short(self):
        """Test adding a task with title too short."""
        service = TaskService()

        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            service.add_task(title="")

    def test_add_task_title_too_long(self):
        """Test adding a task with title too long."""
        long_title = "A" * 201
        service = TaskService()

        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            service.add_task(title=long_title)

    def test_add_task_description_too_long(self):
        """Test adding a task with description too long."""
        long_description = "A" * 1001
        service = TaskService()

        with pytest.raises(ValueError, match="Description must be 1000 characters or less"):
            service.add_task(title="Test", description=long_description)

    def test_get_task_exists(self):
        """Test getting an existing task."""
        service = TaskService()
        added_task = service.add_task(title="Test Task")

        retrieved_task = service.get_task(added_task.id)

        assert retrieved_task is not None
        assert retrieved_task.id == added_task.id
        assert retrieved_task.title == added_task.title

    def test_get_task_not_exists(self):
        """Test getting a non-existing task."""
        service = TaskService()

        retrieved_task = service.get_task(999)

        assert retrieved_task is None

    def test_get_all_tasks_empty(self):
        """Test getting all tasks when none exist."""
        service = TaskService()

        tasks = service.get_all_tasks()

        assert len(tasks) == 0

    def test_get_all_tasks_with_items(self):
        """Test getting all tasks when some exist."""
        service = TaskService()
        task1 = service.add_task(title="Task 1")
        task2 = service.add_task(title="Task 2")

        tasks = service.get_all_tasks()

        assert len(tasks) == 2
        assert task1 in tasks
        assert task2 in tasks

    def test_update_task_title_only(self):
        """Test updating only the title of a task."""
        service = TaskService()
        original_task = service.add_task(title="Original Title", description="Original Description")

        updated_task = service.update_task(task_id=original_task.id, title="Updated Title")

        assert updated_task is not None
        assert updated_task.title == "Updated Title"
        assert updated_task.description == "Original Description"  # Should remain unchanged
        assert updated_task.completed == original_task.completed  # Should remain unchanged

    def test_update_task_description_only(self):
        """Test updating only the description of a task."""
        service = TaskService()
        original_task = service.add_task(title="Original Title", description="Original Description")

        updated_task = service.update_task(task_id=original_task.id, description="Updated Description")

        assert updated_task is not None
        assert updated_task.title == "Original Title"  # Should remain unchanged
        assert updated_task.description == "Updated Description"
        assert updated_task.completed == original_task.completed  # Should remain unchanged

    def test_update_task_both_fields(self):
        """Test updating both title and description of a task."""
        service = TaskService()
        original_task = service.add_task(title="Original Title", description="Original Description")

        updated_task = service.update_task(
            task_id=original_task.id,
            title="Updated Title",
            description="Updated Description"
        )

        assert updated_task is not None
        assert updated_task.title == "Updated Title"
        assert updated_task.description == "Updated Description"
        assert updated_task.completed == original_task.completed  # Should remain unchanged

    def test_update_task_nonexistent(self):
        """Test updating a non-existent task."""
        service = TaskService()

        updated_task = service.update_task(task_id=999, title="Updated Title")

        assert updated_task is None

    def test_delete_task_exists(self):
        """Test deleting an existing task."""
        service = TaskService()
        task = service.add_task(title="Task to Delete")

        result = service.delete_task(task.id)

        assert result is True

        # Verify task no longer exists
        assert service.get_task(task.id) is None

    def test_delete_task_not_exists(self):
        """Test deleting a non-existent task."""
        service = TaskService()

        result = service.delete_task(999)

        assert result is False

    def test_toggle_completion_task_exists(self):
        """Test toggling completion status of an existing task."""
        service = TaskService()
        task = service.add_task(title="Test Task", completed=False)

        # Toggle from False to True
        updated_task = service.toggle_completion(task.id)

        assert updated_task is not None
        assert updated_task.completed is True

        # Toggle from True back to False
        updated_task = service.toggle_completion(task.id)

        assert updated_task is not None
        assert updated_task.completed is False

    def test_toggle_completion_task_not_exists(self):
        """Test toggling completion status of a non-existent task."""
        service = TaskService()

        updated_task = service.toggle_completion(999)

        assert updated_task is None

    def test_get_next_available_id(self):
        """Test getting the next available ID."""
        service = TaskService()

        # Initially should be 1
        assert service.get_next_available_id() == 1

        # Add a task
        service.add_task(title="Test Task")

        # Next available ID should be 2
        assert service.get_next_available_id() == 2

        # Add another task
        service.add_task(title="Another Task")

        # Next available ID should be 3
        assert service.get_next_available_id() == 3