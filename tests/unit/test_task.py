import pytest
from datetime import datetime
from src.todo_app.models.task import Task


class TestTask:
    """Unit tests for the Task model."""

    def test_create_task_success(self):
        """Test creating a valid task."""
        task = Task(task_id=1, title="Test Task", description="Test Description", completed=False)

        assert task.id == 1
        assert task.title == "Test Task"
        assert task.description == "Test Description"
        assert task.completed is False
        assert isinstance(task.created_at, datetime)

    def test_create_task_default_values(self):
        """Test creating a task with default values."""
        task = Task(task_id=1, title="Test Task")

        assert task.id == 1
        assert task.title == "Test Task"
        assert task.description == ""
        assert task.completed is False

    def test_create_task_completed_true(self):
        """Test creating a task with completed=True."""
        task = Task(task_id=1, title="Test Task", completed=True)

        assert task.completed is True

    def test_create_task_empty_description(self):
        """Test creating a task with empty description."""
        task = Task(task_id=1, title="Test Task", description="")

        assert task.description == ""

    def test_create_task_min_title_length(self):
        """Test creating a task with minimum title length (1 character)."""
        task = Task(task_id=1, title="A")

        assert task.title == "A"

    def test_create_task_max_title_length(self):
        """Test creating a task with maximum title length (200 characters)."""
        long_title = "A" * 200
        task = Task(task_id=1, title=long_title)

        assert task.title == long_title
        assert len(task.title) == 200

    def test_create_task_title_too_short(self):
        """Test creating a task with title too short (empty)."""
        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            Task(task_id=1, title="")

    def test_create_task_title_too_long(self):
        """Test creating a task with title too long (over 200 characters)."""
        long_title = "A" * 201
        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            Task(task_id=1, title=long_title)

    def test_create_task_description_too_long(self):
        """Test creating a task with description too long (over 1000 characters)."""
        long_description = "A" * 1001
        with pytest.raises(ValueError, match="Description must be 1000 characters or less"):
            Task(task_id=1, title="Test", description=long_description)

    def test_toggle_completion(self):
        """Test toggling task completion status."""
        task = Task(task_id=1, title="Test Task", completed=False)

        # Toggle from False to True
        new_status = task.toggle_completion()
        assert new_status is True
        assert task.completed is True

        # Toggle from True to False
        new_status = task.toggle_completion()
        assert new_status is False
        assert task.completed is False

    def test_to_dict(self):
        """Test converting task to dictionary."""
        task = Task(task_id=1, title="Test Task", description="Test Description", completed=True)
        task_dict = task.to_dict()

        assert task_dict["id"] == 1
        assert task_dict["title"] == "Test Task"
        assert task_dict["description"] == "Test Description"
        assert task_dict["completed"] is True
        assert task_dict["created_at"] == task.created_at.isoformat()

    def test_from_dict(self):
        """Test creating task from dictionary."""
        original_task = Task(task_id=1, title="Test Task", description="Test Description", completed=True)
        task_dict = original_task.to_dict()

        recreated_task = Task.from_dict(task_dict)

        assert recreated_task.id == original_task.id
        assert recreated_task.title == original_task.title
        assert recreated_task.description == original_task.description
        assert recreated_task.completed == original_task.completed

    def test_validate_valid_task(self):
        """Test validation of a valid task."""
        task = Task(task_id=1, title="Valid Task", description="Valid Description", completed=False)
        is_valid = task.validate()

        assert is_valid is True

    def test_validate_invalid_title_short(self):
        """Test validation of a task with title too short."""
        # This test should expect that a Task with an empty title cannot be created
        # due to validation in the constructor
        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            Task(task_id=1, title="", description="Valid Description", completed=False)

    def test_validate_invalid_title_long(self):
        """Test validation of a task with title too long."""
        # This test should expect that a Task with a title too long cannot be created
        # due to validation in the constructor
        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            Task(task_id=1, title="A"*201, description="Valid Description", completed=False)

    def test_validate_invalid_completed_type(self):
        """Test validation of a task with wrong completed type."""
        task = Task(task_id=1, title="Valid Task", description="Valid Description", completed=True)
        task.completed = "not_a_boolean"  # Override to wrong type
        is_valid = task.validate()

        assert is_valid is False

    def test_str_representation(self):
        """Test string representation of task."""
        task = Task(task_id=1, title="Test Task", description="A longer description for testing", completed=True)
        str_repr = str(task)

        assert "[✓]" in str_repr  # Completed task
        assert "ID: 1" in str_repr
        assert "Test Task" in str_repr

        task.completed = False
        str_repr_pending = str(task)
        assert "[○]" in str_repr_pending  # Pending task

    def test_repr_representation(self):
        """Test developer representation of task."""
        task = Task(task_id=1, title="Test Task", completed=True)
        repr_str = repr(task)

        assert "Task(id=1, title='Test Task', completed=True)" in repr_str