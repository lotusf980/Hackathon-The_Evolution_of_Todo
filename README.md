# Todo Phase 1 - In-Memory Python Console App

A minimal, spec-driven Todo application with console-based interface. This is **Phase 1 MVP** featuring in-memory storage and 5 core CRUD operations.

## Features (Basic Level)

✅ **Add Task** - Input title and description, auto-assign sequential ID starting from 1
✅ **View Tasks** - Display all tasks in formatted table with ID, status, title, description
✅ **Delete Task** - Remove task by ID with error handling for invalid IDs
✅ **Update Task** - Modify title and/or description by ID (partial updates supported)
✅ **Mark as Complete** - Toggle completion status by ID (single command flips state)

**Phase 1 MVP Status**: ✅ COMPLETE - All 5 features implemented and tested

## Quick Setup

### Prerequisites

- Python 3.13 or higher
- UV package manager (recommended)

### Installation

1. **Clone the repository** (or navigate to project directory):
   ```bash
   cd C:\Hackathon\Hackathon_Todo\Phase 1
   ```

2. **Create virtual environment**:
   ```bash
   uv venv
   ```

3. **Activate virtual environment**:
   - Windows: `.venv\Scripts\activate`
   - macOS/Linux: `source .venv/bin/activate`

4. **Install project** (optional, for development):
   ```bash
   uv pip install -e .
   ```

## Running the App

### Option 1: Direct Python execution
```bash
python src/main.py
```

### Option 2: Using UV
```bash
uv run python src/main.py
```

### Option 3: As installed package (after install)
```bash
todo
```

## Usage Demo

### Adding Tasks

```
Welcome to Todo App - Phase 1 MVP!

========================================
       TODO APP - PHASE 1 MVP
========================================
1. Add Task
2. View Tasks
3. Exit
----------------------------------------
Enter your choice (1-3): 1

--- Add New Task ---
Enter task title: Buy groceries
Enter task description (or press Enter to skip): Milk, eggs, bread

✓ Task added successfully with ID 1!
```

### Viewing Tasks

```
Enter your choice (1-4): 2

================================================================================
ID     Status   Title                                    Description
================================================================================
1      [ ]      Buy groceries                            Milk, eggs, bread
2      [ ]      Finish report                            Due tomorrow...
3      [X]      Team meeting                             3pm today
================================================================================
Total: 3 task(s)
```

### Deleting Tasks

```
Enter your choice (1-6): 3

--- Delete Task ---
Enter task ID to delete: 2

[OK] Task deleted successfully.
```

### Updating Tasks

```
Enter your choice (1-6): 4

--- Update Task ---
Enter task ID to update: 1
Enter new title (or press Enter to keep current): Updated title
Enter new description (or press Enter to keep current): Updated description

[OK] Task updated successfully.
```

### Marking as Complete

```
Enter your choice (1-6): 5

--- Mark as Complete ---
Enter task ID to toggle: 1

[OK] Task marked as complete.

Enter your choice (1-6): 5

--- Mark as Complete ---
Enter task ID to toggle: 1

[OK] Task marked as incomplete.
```

**Error Examples:**

```
Enter task ID to delete: 999

[ERROR] Task with ID 999 not found.

Enter task ID to delete: abc

[ERROR] Please enter a valid number.

Enter task ID to delete: -1

[ERROR] Task ID must be a positive number.
```

### Error Handling

**Empty title:**
```
Enter task title:   
Enter task description (or press Enter to skip):

✗ Error: Task title cannot be empty.
```

**Invalid menu choice:**
```
Enter your choice (1-3): 5

✗ Invalid choice. Please enter 1, 2, or 3.
```

## Project Structure

```
C:\Hackathon\Hackathon_Todo\Phase 1\
├── src/
│   ├── __init__.py          # Package marker
│   ├── main.py              # CLI entry point, menu loop, handlers
│   └── todo.py              # Core logic: Task dataclass, TodoList class
├── specs/                   # Feature implementation plans
│   ├── 1-add-task/
│   ├── 2-delete-task/
│   ├── 3-update-task/
│   ├── 4-view-task-list/
│   └── 5-mark-as-complete/
├── specs_history/           # Versioned specifications
│   └── v1.0.0_*.spec.md
├── pyproject.toml           # Project metadata
├── .gitignore               # Git ignore patterns
└── README.md                # This file
```

## Code Architecture

### Separation of Concerns

- **`todo.py`**: Pure business logic
  - `Task` dataclass: Represents a single todo item
  - `TodoList` class: In-memory task manager with CRUD operations
  - No I/O operations - fully testable without mocking

- **`main.py`**: CLI handling
  - Menu display and user input
  - Output formatting
  - Error message display
  - Calls business logic functions

### Design Principles

1. **Simplicity First**: Straightforward functions, no over-engineering
2. **In-Memory Only**: No persistence - data lost on exit (Phase 1 constraint)
3. **Console-First UX**: Clear prompts, actionable error messages
4. **Testable by Design**: Core logic separated from I/O
5. **Clean Code Standards**: PEP 8, type hints, docstrings throughout

## Development Workflow

This project follows spec-driven development:

1. **Constitution** → `.specify/memory/constitution.md` (foundational principles)
2. **Specification** → `specs_history/v1.0.0_*.spec.md` (feature specs)
3. **Plan** → `specs/[feature]/plan.md` (implementation plan)
4. **Tasks** → `specs/[feature]/tasks.md` (actionable tasks)
5. **Implementation** → `src/*.py` (following tasks)
6. **Testing** → Manual verification (Phase 1)

## Testing (Manual)

Run the test suite:
```bash
cd src
python test_manual.py
```

**Test Coverage**: 31 tests across all 5 features

### Test Add Task
1. Run `python src/main.py`
2. Select option 1 (Add Task)
3. Enter title: "Test Task"
4. Enter description: "Testing add feature"
5. Verify: "✓ Task added successfully with ID 1!"

### Test Empty Title Validation
1. Select option 1 (Add Task)
2. Enter title: "   " (spaces only)
3. Enter description: (anything)
4. Verify: "✗ Error: Task title cannot be empty."

### Test View Tasks (Empty)
1. Select option 2 (View Tasks) with no tasks
2. Verify: "No tasks found. Add a task to get started!"

### Test View Tasks (With Data)
1. Add 2-3 tasks
2. Select option 2 (View Tasks)
3. Verify: All tasks displayed with correct IDs, titles, descriptions

## Success Criteria (Phase 1 MVP)

- ✅ All 5 features work as specified
- ✅ Code is clean, readable, PEP 8 compliant
- ✅ Type hints present on all functions
- ✅ Docstrings on all public functions/classes
- ✅ No crashes on invalid input
- ✅ Clear, actionable error messages
- ✅ Application state lost on restart (in-memory design)

## Next Steps (Future Phases)

### Intermediate Level (Phase 2)
- Subtasks (parent-child relationships)
- Tags/Categories (filter by tag)
- Search/Filter (find tasks by text)

### Advanced Level (Phase 3)
- Recurring Tasks (daily/weekly/monthly)
- Due Dates & Overdue Indicators
- Smart notifications

### Future Enhancements (Phase 4+)
- Persistent storage (file/SQLite)
- GUI interface
- Web interface
- Sync across devices

## License

MIT License - See LICENSE file for details.

## Version

**Phase 1 MVP** - Version 0.1.0

---

**Built with**: Python 3.13+, UV, Spec-Kit Plus, Qwen AI
