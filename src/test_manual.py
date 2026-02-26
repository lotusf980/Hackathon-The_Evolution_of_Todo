"""
Manual test script for Todo Phase 1 MVP.

Run this script to verify all Basic Level features work correctly.
"""

from todo import TodoList, Task


def test_add_task() -> None:
    """Test adding tasks."""
    print("\n=== TEST: Add Task ===")
    
    todo_list = TodoList()
    
    # Test 1: Add task with title and description
    task1 = todo_list.add_task("Buy groceries", "Milk, eggs, bread")
    assert task1.id == 1, f"Expected ID 1, got {task1.id}"
    assert task1.title == "Buy groceries"
    assert task1.description == "Milk, eggs, bread"
    assert task1.completed is False
    print("[PASS] Task 1 added with ID 1")
    
    # Test 2: Add task with only title
    task2 = todo_list.add_task("Finish report")
    assert task2.id == 2, f"Expected ID 2, got {task2.id}"
    assert task2.title == "Finish report"
    assert task2.description == ""
    print("[PASS] Task 2 added with empty description")
    
    # Test 3: Add task with whitespace trimming
    task3 = todo_list.add_task("  Team meeting  ", "  Conference room A  ")
    assert task3.id == 3
    assert task3.title == "Team meeting"  # Trimmed
    assert task3.description == "Conference room A"  # Trimmed
    print("[PASS] Task 3 added with trimmed whitespace")
    
    # Test 4: Add task with empty title (should raise ValueError)
    try:
        todo_list.add_task("", "Description")
        print("[FAIL] Empty title should raise ValueError")
    except ValueError as e:
        assert str(e) == "Task title cannot be empty."
        print("[PASS] Empty title rejected with correct error")
    
    # Test 5: Add task with whitespace-only title
    try:
        todo_list.add_task("   ", "Description")
        print("[FAIL] Whitespace-only title should raise ValueError")
    except ValueError as e:
        assert str(e) == "Task title cannot be empty."
        print("[PASS] Whitespace-only title rejected with correct error")
    
    print("\n=== All Add Task tests PASSED ===\n")


def test_view_tasks() -> None:
    """Test viewing tasks (get_all_tasks method)."""
    print("\n=== TEST: View Tasks ===")
    
    todo_list = TodoList()
    
    # Test 1: Empty list
    tasks = todo_list.get_all_tasks()
    assert len(tasks) == 0
    print("[PASS] Empty task list returns empty list")
    
    # Test 2: Multiple tasks in order
    todo_list.add_task("Task 1")
    todo_list.add_task("Task 2")
    todo_list.add_task("Task 3")
    
    tasks = todo_list.get_all_tasks()
    assert len(tasks) == 3
    assert tasks[0].id == 1
    assert tasks[1].id == 2
    assert tasks[2].id == 3
    print("[PASS] Tasks returned in correct order with correct IDs")
    
    # Test 3: get_all_tasks returns a copy (not the original list)
    original_count = len(todo_list.get_all_tasks())
    tasks.append(Task(id=999, title="Fake task", description=""))
    assert len(todo_list.get_all_tasks()) == original_count
    print("[PASS] get_all_tasks returns a copy, not original list")
    
    print("\n=== All View Tasks tests PASSED ===\n")


def test_get_task_by_id() -> None:
    """Test getting task by ID."""
    print("\n=== TEST: Get Task By ID ===")
    
    todo_list = TodoList()
    todo_list.add_task("Task 1")
    todo_list.add_task("Task 2")
    todo_list.add_task("Task 3")
    
    # Test 1: Get existing task
    task = todo_list.get_task_by_id(2)
    assert task is not None
    assert task.title == "Task 2"
    print("[PASS] Get existing task by ID")
    
    # Test 2: Get non-existent task
    task = todo_list.get_task_by_id(999)
    assert task is None
    print("[PASS] Non-existent task returns None")
    
    print("\n=== All Get Task By ID tests PASSED ===\n")


def test_delete_task() -> None:
    """Test deleting tasks."""
    print("\n=== TEST: Delete Task ===")
    
    todo_list = TodoList()
    
    # Test 1: Delete from empty list
    result = todo_list.delete_task(1)
    assert result is False
    print("[PASS] Delete from empty list returns False")
    
    # Test 2: Add and delete a task
    todo_list.add_task("Task to delete")
    result = todo_list.delete_task(1)
    assert result is True
    assert len(todo_list.get_all_tasks()) == 0
    print("[PASS] Delete existing task returns True and removes task")
    
    # Test 3: Delete non-existent task
    todo_list.add_task("Task 1")
    todo_list.add_task("Task 2")
    result = todo_list.delete_task(999)
    assert result is False
    assert len(todo_list.get_all_tasks()) == 2
    print("[PASS] Delete non-existent task returns False")
    
    # Test 4: Delete middle task (IDs should NOT be renumbered)
    todo_list = TodoList()
    todo_list.add_task("Task 1")
    todo_list.add_task("Task 2")
    todo_list.add_task("Task 3")
    todo_list.delete_task(2)
    tasks = todo_list.get_all_tasks()
    assert len(tasks) == 2
    assert tasks[0].id == 1  # ID 1 still exists
    assert tasks[1].id == 3  # ID 3 still exists (not renumbered to 2)
    print("[PASS] Delete middle task preserves other IDs (no renumbering)")
    
    # Test 5: Delete task 1, then add new task (new task gets next ID)
    todo_list = TodoList()
    todo_list.add_task("Task 1")
    todo_list.add_task("Task 2")
    todo_list.delete_task(1)
    todo_list.add_task("New Task")
    tasks = todo_list.get_all_tasks()
    assert tasks[0].id == 2  # Original task 2
    assert tasks[1].id == 3  # New task gets ID 3 (not 1)
    print("[PASS] New task after delete gets next sequential ID")
    
    print("\n=== All Delete Task tests PASSED ===\n")


def test_update_task() -> None:
    """Test updating tasks."""
    print("\n=== TEST: Update Task ===")
    
    todo_list = TodoList()
    todo_list.add_task("Original Title", "Original Description")
    
    # Test 1: Update title only
    result = todo_list.update_task(1, title="New Title")
    assert result is True
    task = todo_list.get_task_by_id(1)
    assert task.title == "New Title"
    assert task.description == "Original Description"
    print("[PASS] Update title only, description unchanged")
    
    # Test 2: Update description only
    result = todo_list.update_task(1, description="New Description")
    assert result is True
    task = todo_list.get_task_by_id(1)
    assert task.title == "New Title"
    assert task.description == "New Description"
    print("[PASS] Update description only, title unchanged")
    
    # Test 3: Update both title and description
    result = todo_list.update_task(1, title="Both New", description="Both New")
    assert result is True
    task = todo_list.get_task_by_id(1)
    assert task.title == "Both New"
    assert task.description == "Both New"
    print("[PASS] Update both title and description")
    
    # Test 4: Update non-existent task
    result = todo_list.update_task(999, title="Fake")
    assert result is False
    print("[PASS] Update non-existent task returns False")
    
    # Test 5: Update with empty title (should raise ValueError)
    try:
        todo_list.update_task(1, title="")
        print("[FAIL] Empty title should raise ValueError")
    except ValueError as e:
        assert str(e) == "Task title cannot be empty."
        print("[PASS] Empty title rejected with correct error")
    
    # Test 6: Update with whitespace-only title
    try:
        todo_list.update_task(1, title="   ")
        print("[FAIL] Whitespace-only title should raise ValueError")
    except ValueError as e:
        assert str(e) == "Task title cannot be empty."
        print("[PASS] Whitespace-only title rejected with correct error")
    
    # Test 7: Update with empty description (valid)
    result = todo_list.update_task(1, description="")
    assert result is True
    task = todo_list.get_task_by_id(1)
    assert task.description == ""
    print("[PASS] Empty description is valid")
    
    # Test 8: Verify completed status unchanged after update
    todo_list = TodoList()
    todo_list.add_task("Task")
    todo_list.toggle_complete(1)
    assert todo_list.get_task_by_id(1).completed is True
    todo_list.update_task(1, title="Updated")
    assert todo_list.get_task_by_id(1).completed is True
    print("[PASS] Update does not change completed status")
    
    print("\n=== All Update Task tests PASSED ===\n")


def test_toggle_complete() -> None:
    """Test toggling task completion."""
    print("\n=== TEST: Mark as Complete (Toggle) ===")
    
    todo_list = TodoList()
    todo_list.add_task("Task 1")
    
    # Test 1: Toggle incomplete task to complete
    result = todo_list.toggle_complete(1)
    assert result is True
    assert todo_list.get_task_by_id(1).completed is True
    print("[PASS] Toggle incomplete task to complete")
    
    # Test 2: Toggle complete task to incomplete
    result = todo_list.toggle_complete(1)
    assert result is False
    assert todo_list.get_task_by_id(1).completed is False
    print("[PASS] Toggle complete task to incomplete")
    
    # Test 3: Toggle multiple times
    todo_list.toggle_complete(1)
    todo_list.toggle_complete(1)
    todo_list.toggle_complete(1)
    assert todo_list.get_task_by_id(1).completed is True
    print("[PASS] Toggle multiple times flips state correctly")
    
    # Test 4: Toggle non-existent task
    result = todo_list.toggle_complete(999)
    assert result is None
    print("[PASS] Toggle non-existent task returns None")
    
    # Test 5: Toggle does not change title/description
    todo_list = TodoList()
    todo_list.add_task("Original", "Description")
    todo_list.toggle_complete(1)
    task = todo_list.get_task_by_id(1)
    assert task.title == "Original"
    assert task.description == "Description"
    print("[PASS] Toggle does not change title/description")
    
    print("\n=== All Mark as Complete tests PASSED ===\n")


def main() -> None:
    """Run all tests."""
    print("\n" + "=" * 60)
    print("TODO PHASE 1 MVP - MANUAL TEST SUITE")
    print("=" * 60)
    
    test_add_task()
    test_view_tasks()
    test_get_task_by_id()
    test_delete_task()
    test_update_task()
    test_toggle_complete()
    
    print("\n" + "=" * 60)
    print("ALL TESTS PASSED SUCCESSFULLY!")
    print("=" * 60)
    print("\nThe Todo app Basic Level (ALL 5 FEATURES) is working correctly.")
    print("Phase 1 MVP Complete: Add, View, Delete, Update, Mark as Complete\n")


if __name__ == "__main__":
    main()
