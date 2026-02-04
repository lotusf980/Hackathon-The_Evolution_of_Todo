# Quickstart Guide: Phase 1 - Todo In-Memory Python Console App

## Prerequisites
- Python 3.13 or higher
- UV package manager
- Git (for repository cloning)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies
```bash
uv sync
```
Or if using pip:
```bash
pip install -r requirements.txt
```

### 3. Run the Application
```bash
python -m src.todo_app.main
```

## Usage Instructions

### Starting the Application
1. Navigate to the project directory
2. Run the application using the command above
3. The main menu will appear with numbered options

### Available Commands
1. **Add Task**: Creates a new todo item
   - Enter title (required, 1-200 characters)
   - Optionally enter description (up to 1000 characters)
   - Task will be added with completion status as "Incomplete"

2. **View Tasks**: Displays all tasks with details
   - Shows ID, title, completion status, description, and creation date
   - Lists all tasks in the order they were created

3. **Update Task**: Modifies an existing task
   - Enter the task ID to update
   - Optionally update the title and/or description
   - Original completion status is preserved

4. **Delete Task**: Removes a task from the list
   - Enter the task ID to delete
   - Confirmation required before deletion
   - Task is permanently removed

5. **Mark Complete/Incomplete**: Toggles task completion status
   - Enter the task ID to toggle
   - Changes completion status from complete to incomplete or vice versa
   - Confirmation of status change is displayed

6. **Exit**: Terminates the application
   - Saves nothing (data stored in memory only)
   - All tasks will be lost upon exit

## Example Workflow
```
Welcome to Todo Console App!

1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Choose an option: 1
Enter task title: Buy groceries
Enter task description (optional): Milk, eggs, bread
Task added successfully with ID 1!

Choose an option: 2
ID: 1, Title: Buy groceries, Status: Incomplete, Description: Milk, eggs, bread

Choose an option: 5
Enter task ID to toggle: 1
Task 1 marked as Complete!

Choose an option: 6
Goodbye!
```

## Troubleshooting
- If you get a "module not found" error, ensure you're running from the project root
- If the application won't start, verify Python 3.13+ is installed
- For invalid input errors, follow the prompts exactly as specified
- All data is stored in memory and will be lost when the application exits