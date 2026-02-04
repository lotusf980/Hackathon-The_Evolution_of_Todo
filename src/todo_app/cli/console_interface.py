from typing import Optional
from ..services.task_service import TaskService
from ..models.task import Task


class ConsoleInterface:
    """
    Console interface for the todo application.
    """

    def __init__(self, task_service: TaskService):
        """
        Initialize the console interface with a task service.

        Args:
            task_service (TaskService): The task service to use
        """
        self.task_service = task_service

    def display_menu(self):
        """Display the main menu options."""
        print("\n" + "="*50)
        print("           TODO CONSOLE APPLICATION")
        print("="*50)
        print("1. Add Task")
        print("2. View All Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Mark Complete/Incomplete")
        print("6. Help")
        print("7. Exit")
        print("="*50)

    def get_user_choice(self) -> str:
        """
        Get the user's menu choice.

        Returns:
            str: The user's choice
        """
        try:
            choice = input("Choose an option (1-7): ").strip()
            return choice
        except KeyboardInterrupt:
            print("\n\nOperation cancelled by user.")
            return "7"  # Return exit option
        except EOFError:
            print("\n\nEnd of input received. Exiting.")
            return "7"  # Return exit option

    def add_task(self):
        """Handle adding a new task."""
        print("\n--- Add New Task ---")

        try:
            title = input("Enter task title (1-200 characters): ").strip()

            if not title:
                print("XXX Error: Title cannot be empty.")
                return

            if len(title) > 200:
                print(f"XXX Error: Title exceeds 200 characters ({len(title)} entered).")
                return

            description_input = input("Enter task description (optional, press Enter to skip): ").strip()
            description = description_input if description_input else None

            task = self.task_service.add_task(title=title, description=description)
            print(f"*** Task added successfully! ID: {task.id}")

        except ValueError as e:
            print(f"XXX Error: {e}")
        except Exception as e:
            print(f"XXX Unexpected error occurred: {e}")

    def view_tasks(self):
        """Handle viewing all tasks."""
        print("\n--- All Tasks ---")

        tasks = self.task_service.get_all_tasks()

        if not tasks:
            print("📝 No tasks found.")
            return

        print(f"Total tasks: {len(tasks)}")
        print("-" * 80)

        for task in tasks:
            status_icon = "X" if task.completed else "O"
            status_text = "Completed" if task.completed else "Pending"

            print(f"ID: {task.id:3} | [{status_icon}] {status_text} | Title: {task.title}")

            if task.description:
                desc_preview = task.description[:60] + "..." if len(task.description) > 60 else task.description
                print(f"       Description: {desc_preview}")

            print(f"       Created: {task.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
            print("-" * 80)

    def update_task(self):
        """Handle updating an existing task."""
        print("\n--- Update Task ---")

        if not self._confirm_has_tasks():
            return

        try:
            task_id_str = input("Enter task ID to update: ").strip()

            if not task_id_str.isdigit():
                print("XXX Error: Task ID must be a number.")
                return

            task_id = int(task_id_str)
            existing_task = self.task_service.get_task(task_id)

            if not existing_task:
                print(f"XXX Error: Task with ID {task_id} not found.")
                return

            print(f"Current task: [{ 'X' if existing_task.completed else 'O' }] {existing_task.title}")

            new_title = input(f"Enter new title (leave blank to keep '{existing_task.title}'): ").strip()
            if new_title == "":
                new_title = None  # Keep the original title

            new_description = input(f"Enter new description (leave blank to keep current): ").strip()
            if new_description == "":
                new_description = None  # Keep the original description
            elif new_description.lower() in ['none', 'null']:
                new_description = ""  # Set to empty string

            # If no changes were made, inform the user
            if new_title is None and new_description is None:
                print("Info:  No changes made to the task.")
                return

            # Update the task
            updated_task = self.task_service.update_task(
                task_id=task_id,
                title=new_title,
                description=new_description
            )

            if updated_task:
                print(f"*** Task {task_id} updated successfully!")
            else:
                print(f"XXX Error: Failed to update task {task_id}.")

        except ValueError as e:
            print(f"XXX Error: {e}")
        except Exception as e:
            print(f"XXX Unexpected error occurred: {e}")

    def delete_task(self):
        """Handle deleting a task."""
        print("\n--- Delete Task ---")

        if not self._confirm_has_tasks():
            return

        try:
            task_id_str = input("Enter task ID to delete: ").strip()

            if not task_id_str.isdigit():
                print("XXX Error: Task ID must be a number.")
                return

            task_id = int(task_id_str)
            existing_task = self.task_service.get_task(task_id)

            if not existing_task:
                print(f"XXX Error: Task with ID {task_id} not found.")
                return

            print(f"Task to delete: [{ 'X' if existing_task.completed else 'O' }] {existing_task.title}")

            confirmation = input(f"Are you sure you want to delete task {task_id}? (yes/no): ").strip().lower()

            if confirmation in ['yes', 'y', 'ye']:
                success = self.task_service.delete_task(task_id)

                if success:
                    print(f"*** Task {task_id} deleted successfully!")
                else:
                    print(f"XXX Error: Failed to delete task {task_id}.")
            else:
                print("XXX Task deletion cancelled.")

        except Exception as e:
            print(f"XXX Unexpected error occurred: {e}")

    def toggle_completion(self):
        """Handle toggling task completion status."""
        print("\n--- Toggle Task Completion ---")

        if not self._confirm_has_tasks():
            return

        try:
            task_id_str = input("Enter task ID to toggle: ").strip()

            if not task_id_str.isdigit():
                print("XXX Error: Task ID must be a number.")
                return

            task_id = int(task_id_str)
            existing_task = self.task_service.get_task(task_id)

            if not existing_task:
                print(f"XXX Error: Task with ID {task_id} not found.")
                return

            status_before = "Completed" if existing_task.completed else "Pending"
            updated_task = self.task_service.toggle_completion(task_id)

            if updated_task:
                status_after = "Completed" if updated_task.completed else "Pending"
                print(f"*** Task {task_id} status changed from {status_before} to {status_after}!")
            else:
                print(f"XXX Error: Failed to toggle task {task_id}.")

        except Exception as e:
            print(f"XXX Unexpected error occurred: {e}")

    def show_help(self):
        """Display help information."""
        print("\n--- Help ---")
        print("This is a console-based todo application.")
        print("\nAvailable commands:")
        print("1. Add Task - Create a new todo item")
        print("2. View All Tasks - See all your tasks with status")
        print("3. Update Task - Modify an existing task's details")
        print("4. Delete Task - Remove a task from your list")
        print("5. Mark Complete/Incomplete - Toggle task completion status")
        print("6. Help - Show this help message")
        print("7. Exit - Quit the application")
        print("\nAll data is stored in memory and will be lost when the application exits.")

    def _confirm_has_tasks(self) -> bool:
        """
        Check if there are any tasks and inform the user if none exist.

        Returns:
            bool: True if there are tasks, False otherwise
        """
        if not self.task_service.get_all_tasks():
            print("📝 No tasks found. Please add some tasks first.")
            return False
        return True

    def run(self):
        """Run the main application loop."""
        print("Welcome to the Todo Console Application!")
        print("Type '7' or 'exit' to quit the application at any time.")

        while True:
            self.display_menu()
            choice = self.get_user_choice()

            if choice == "1":
                self.add_task()
            elif choice == "2":
                self.view_tasks()
            elif choice == "3":
                self.update_task()
            elif choice == "4":
                self.delete_task()
            elif choice == "5":
                self.toggle_completion()
            elif choice == "6":
                self.show_help()
            elif choice == "7":
                print("\nThank you for using the Todo Console Application!")
                print("Goodbye!")
                break
            else:
                print("\nXXX Invalid choice. Please select a number between 1-7.")

            # Pause to let user see the result before showing menu again
            if choice != "7":
                input("\nPress Enter to continue...")