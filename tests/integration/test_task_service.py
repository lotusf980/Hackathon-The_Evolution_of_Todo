import pytest
from src.todo_app.services.task_service import TaskService
from src.todo_app.models.task import Task


class TestTaskServiceIntegration:
    """Integration tests for the TaskService."""

    def test_full_task_lifecycle(self):
        """Test the complete lifecycle of a task: add, get, update, toggle, delete."""
        service = TaskService()

        # Add a task
        task = service.add_task(title="Integration Test Task", description="Test description for integration")
        original_id = task.id

        assert task.title == "Integration Test Task"
        assert task.description == "Test description for integration"
        assert task.completed is False

        # Retrieve the task
        retrieved_task = service.get_task(original_id)
        assert retrieved_task is not None
        assert retrieved_task.id == original_id
        assert retrieved_task.title == "Integration Test Task"

        # Update the task
        updated_task = service.update_task(
            task_id=original_id,
            title="Updated Integration Test Task",
            description="Updated test description"
        )
        assert updated_task is not None
        assert updated_task.title == "Updated Integration Test Task"
        assert updated_task.description == "Updated test description"

        # Toggle completion status
        toggled_task = service.toggle_completion(original_id)
        assert toggled_task is not None
        assert toggled_task.completed is True

        # Toggle again to make sure it works both ways
        toggled_task = service.toggle_completion(original_id)
        assert toggled_task is not None
        assert toggled_task.completed is False

        # Delete the task
        delete_result = service.delete_task(original_id)
        assert delete_result is True

        # Verify task is gone
        deleted_task = service.get_task(original_id)
        assert deleted_task is None

    def test_multiple_tasks_operations(self):
        """Test operations with multiple tasks."""
        service = TaskService()

        # Add multiple tasks
        task1 = service.add_task(title="First Task", description="First description")
        task2 = service.add_task(title="Second Task", description="Second description")
        task3 = service.add_task(title="Third Task")

        # Verify all tasks exist
        all_tasks = service.get_all_tasks()
        assert len(all_tasks) == 3

        # Verify specific tasks
        retrieved_task1 = service.get_task(task1.id)
        retrieved_task2 = service.get_task(task2.id)
        retrieved_task3 = service.get_task(task3.id)

        assert retrieved_task1 is not None
        assert retrieved_task2 is not None
        assert retrieved_task3 is not None

        assert retrieved_task1.title == "First Task"
        assert retrieved_task2.title == "Second Task"
        assert retrieved_task3.title == "Third Task"

        # Update one task
        updated_task2 = service.update_task(task_id=task2.id, title="Modified Second Task")
        assert updated_task2 is not None
        assert updated_task2.title == "Modified Second Task"

        # Toggle completion of another
        toggled_task3 = service.toggle_completion(task3.id)
        assert toggled_task3 is not None
        assert toggled_task3.completed is True

        # Delete one task
        delete_result = service.delete_task(task1.id)
        assert delete_result is True

        # Verify remaining tasks
        remaining_tasks = service.get_all_tasks()
        assert len(remaining_tasks) == 2

        # Verify deleted task is gone
        assert service.get_task(task1.id) is None

        # Verify other tasks still exist
        assert service.get_task(task2.id) is not None
        assert service.get_task(task3.id) is not None

    def test_task_validation_integration(self):
        """Test validation throughout the service layer."""
        service = TaskService()

        # Test that invalid titles are rejected
        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            service.add_task(title="")  # Empty title

        with pytest.raises(ValueError, match="Title must be between 1 and 200 characters"):
            service.add_task(title="A" * 201)  # Title too long

        # Test that invalid descriptions are rejected
        with pytest.raises(ValueError, match="Description must be 1000 characters or less"):
            service.add_task(title="Valid Title", description="A" * 1001)  # Description too long

        # Verify no tasks were added due to validation errors
        all_tasks = service.get_all_tasks()
        assert len(all_tasks) == 0

    def test_task_id_uniqueness(self):
        """Test that task IDs are unique."""
        service = TaskService()

        # Add multiple tasks
        tasks = []
        for i in range(10):
            task = service.add_task(title=f"Task {i}", description=f"Description {i}")
            tasks.append(task)

        # Verify all IDs are unique
        ids = [task.id for task in tasks]
        assert len(ids) == len(set(ids))  # Set removes duplicates, lengths should match

        # Verify IDs are sequential starting from 1
        expected_ids = list(range(1, 11))
        assert sorted(ids) == expected_ids

    def test_concurrent_operations_simulation(self):
        """Simulate multiple operations to test service stability."""
        service = TaskService()

        # Add several tasks
        tasks = []
        for i in range(5):
            task = service.add_task(title=f"Task {i}", description=f"Description {i}")
            tasks.append(task)

        # Perform mixed operations
        # Update first task
        updated = service.update_task(task_id=tasks[0].id, title="Updated First Task")
        assert updated is not None
        assert updated.title == "Updated First Task"

        # Toggle completion of second task
        toggled = service.toggle_completion(tasks[1].id)
        assert toggled is not None
        assert toggled.completed is True

        # Delete third task
        deleted = service.delete_task(tasks[2].id)
        assert deleted is True

        # Add another task
        new_task = service.add_task(title="New Task", description="New description")
        assert new_task is not None

        # Verify state
        all_tasks = service.get_all_tasks()
        assert len(all_tasks) == 5  # 5 original - 1 deleted + 1 added = 5

        # Verify specific states
        assert service.get_task(tasks[0].id).title == "Updated First Task"
        assert service.get_task(tasks[1].id).completed is True
        assert service.get_task(tasks[2].id) is None  # Deleted
        assert service.get_task(new_task.id) is not None