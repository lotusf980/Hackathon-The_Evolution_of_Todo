"""
Todo console application entry point and CLI handlers.

This module provides the main menu loop and CLI handlers for all
Todo application features.
"""

from todo import TodoList, Task


def display_menu() -> None:
    """Display the main menu options."""
    print("\n" + "=" * 40)
    print("       TODO APP - PHASE 1 MVP")
    print("=" * 40)
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Delete Task")
    print("4. Update Task")
    print("5. Mark as Complete")
    print("6. Exit")
    print("-" * 40)


def handle_add_task(todo_list: TodoList) -> None:
    """
    CLI handler for adding tasks.

    Prompts user for title (required) and description (optional),
    validates input, adds task, and displays confirmation.

    Args:
        todo_list: The TodoList instance to add the task to.
    """
    print("\n--- Add New Task ---")

    # Get title (required)
    title = input("Enter task title: ")

    # Get description (optional)
    description = input("Enter task description (or press Enter to skip): ")

    try:
        # Add task to list
        task = todo_list.add_task(title, description)
        print(f"\n[OK] Task added successfully with ID {task.id}!")
    except ValueError as e:
        print(f"\n[ERROR] {e}")


def handle_view_tasks(todo_list: TodoList) -> None:
    """
    Display all tasks in a formatted table.

    Args:
        todo_list: The TodoList instance to display.
    """
    tasks = todo_list.get_all_tasks()

    if not tasks:
        print("\nNo tasks found. Add a task to get started!")
        return

    print("\n" + "=" * 80)
    print(f"{'ID':<6} {'Status':<8} {'Title':<40} {'Description':<50}")
    print("=" * 80)

    for task in tasks:
        # Format status
        status = "[X]" if task.completed else "[ ]"

        # Truncate title and description
        title = task.title if len(task.title) <= 40 else task.title[:37] + "..."
        description = task.description if len(task.description) <= 50 else task.description[:47] + "..."

        # Replace newlines with spaces
        description = description.replace("\n", " ")

        print(f"{task.id:<6} {status:<8} {title:<40} {description:<50}")

    print("=" * 80)
    print(f"Total: {len(tasks)} task(s)")


def handle_delete_task(todo_list: TodoList) -> None:
    """
    CLI handler for deleting tasks.

    Prompts for ID, validates input, attempts deletion,
    displays success or appropriate error message.

    Args:
        todo_list: The TodoList instance to delete the task from.
    """
    print("\n--- Delete Task ---")

    # Check if list is empty
    if not todo_list.get_all_tasks():
        print("\n[ERROR] No tasks exist.")
        return

    # Get task ID
    id_input = input("Enter task ID to delete: ")

    # Validate input is numeric
    try:
        task_id = int(id_input)
    except ValueError:
        print("\n[ERROR] Please enter a valid number.")
        return

    # Validate ID is positive
    if task_id <= 0:
        print("\n[ERROR] Task ID must be a positive number.")
        return

    # Attempt deletion
    if todo_list.delete_task(task_id):
        print("\n[OK] Task deleted successfully.")
    else:
        print(f"\n[ERROR] Task with ID {task_id} not found.")


def handle_update_task(todo_list: TodoList) -> None:
    """
    CLI handler for updating tasks.

    Prompts for ID, validates, prompts for new title/description
    (with instructions to skip for no change), updates task,
    displays confirmation or error.

    Args:
        todo_list: The TodoList instance to update the task in.
    """
    print("\n--- Update Task ---")

    # Check if list is empty
    if not todo_list.get_all_tasks():
        print("\n[ERROR] No tasks exist.")
        return

    # Get task ID
    id_input = input("Enter task ID to update: ")

    # Validate input is numeric
    try:
        task_id = int(id_input)
    except ValueError:
        print("\n[ERROR] Please enter a valid number.")
        return

    # Validate ID is positive
    if task_id <= 0:
        print("\n[ERROR] Task ID must be a positive number.")
        return

    # Check if task exists
    task = todo_list.get_task_by_id(task_id)
    if task is None:
        print(f"\n[ERROR] Task with ID {task_id} not found.")
        return

    # Get new title (empty = keep current)
    title_input = input("Enter new title (or press Enter to keep current): ")
    new_title = title_input.strip() if title_input.strip() else None

    # Get new description (empty = keep current)
    desc_input = input("Enter new description (or press Enter to keep current): ")
    new_description = desc_input.strip() if desc_input.strip() else None

    # If both are None, nothing to update
    if new_title is None and new_description is None:
        # Treat empty input as "no change" for description, but validate title
        if title_input.strip() == "":
            new_title = None
        if desc_input.strip() == "":
            new_description = None

    try:
        # Attempt update (pass empty string if user entered empty for description)
        # For title, pass None if empty (keep current), but if user explicitly entered something, validate it
        title_to_pass = title_input if title_input.strip() else None
        desc_to_pass = desc_input if desc_input.strip() else ""
        
        if title_to_pass is not None and title_to_pass.strip() == "":
            raise ValueError("Task title cannot be empty.")
        
        if todo_list.update_task(task_id, title_to_pass, desc_to_pass):
            print("\n[OK] Task updated successfully.")
        else:
            print(f"\n[ERROR] Failed to update task with ID {task_id}.")
    except ValueError as e:
        print(f"\n[ERROR] {e}")


def handle_toggle_complete(todo_list: TodoList) -> None:
    """
    CLI handler for toggling task completion.

    Prompts for ID, validates input, toggles completion status,
    displays confirmation with new state or error message.

    Args:
        todo_list: The TodoList instance to toggle the task in.
    """
    print("\n--- Mark as Complete ---")

    # Check if list is empty
    if not todo_list.get_all_tasks():
        print("\n[ERROR] No tasks exist.")
        return

    # Get task ID
    id_input = input("Enter task ID to toggle: ")

    # Validate input is numeric
    try:
        task_id = int(id_input)
    except ValueError:
        print("\n[ERROR] Please enter a valid number.")
        return

    # Validate ID is positive
    if task_id <= 0:
        print("\n[ERROR] Task ID must be a positive number.")
        return

    # Attempt toggle
    result = todo_list.toggle_complete(task_id)
    
    if result is True:
        print("\n[OK] Task marked as complete.")
    elif result is False:
        print("\n[OK] Task marked as incomplete.")
    else:
        print(f"\n[ERROR] Task with ID {task_id} not found.")


def main() -> None:
    """
    Main entry point for the Todo application.

    Runs the main menu loop and handles user input.
    """
    todo_list = TodoList()

    print("\nWelcome to Todo App - Phase 1 MVP!")

    while True:
        display_menu()
        choice = input("Enter your choice (1-6): ").strip()

        if choice == "1":
            handle_add_task(todo_list)
        elif choice == "2":
            handle_view_tasks(todo_list)
        elif choice == "3":
            handle_delete_task(todo_list)
        elif choice == "4":
            handle_update_task(todo_list)
        elif choice == "5":
            handle_toggle_complete(todo_list)
        elif choice == "6":
            print("\nGoodbye!")
            break
        else:
            print("\n[ERROR] Invalid choice. Please enter 1, 2, 3, 4, 5, or 6.")


if __name__ == "__main__":
    main()
