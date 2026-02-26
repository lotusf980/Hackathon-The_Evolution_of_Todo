# Implementation Plan: Add Task

**Branch**: `1-add-task` | **Date**: 2026-02-26 | **Spec**: `specs_history/v1.0.0_add-task.spec.md`

**Input**: Feature specification for Add Task - User provides title and description, system auto-assigns sequential ID starting from 1

## Summary

Implement the foundational Add Task feature for the in-memory Todo console app. Users can add tasks with a required title and optional description. The system automatically assigns unique, sequential integer IDs starting from 1. Includes input validation (empty title rejection, whitespace trimming) and clear error messages.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: None (stdlib only)
**Storage**: In-memory list/dict (no persistence in Phase 1)
**Testing**: Manual console testing (unit tests optional in Phase 1)
**Target Platform**: Cross-platform console/terminal
**Project Type**: Single Python project
**Performance Goals**: <100ms operation time (trivial for in-memory)
**Constraints**: Zero external dependencies, PEP 8 compliance, type hints mandatory
**Scale/Scope**: MVP with 5 core features, <1000 tasks expected

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Simplicity First | ✅ PASS | Single function for add operation, no over-engineering |
| II. In-Memory Only | ✅ PASS | Tasks stored in Python list/dict, no file I/O |
| III. Console-First UX | ✅ PASS | stdin/stdout interaction, clear prompts |
| IV. Testable by Design | ✅ PASS | Core logic separated from I/O, pure functions |
| V. Clean Code Standards | ✅ PASS | Type hints, PEP 8, docstrings, named constants |

**GATE RESULT**: ✅ All principles satisfied - proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/1-add-task/
├── plan.md              # This file
├── research.md          # Phase 0 output (see below - no unknowns)
├── data-model.md        # Phase 1 output (Task dataclass)
├── quickstart.md        # Phase 1 output (how to add tasks)
├── contracts/           # Phase 1 output (function signatures)
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
src/
├── __init__.py          # Package marker
├── main.py              # CLI entry point, menu loop, add_task CLI handler
└── todo.py              # Core logic: Task dataclass, TodoList class, add_task function

tests/
└── (optional for Phase 1)
```

**Structure Decision**: Single project structure with clear separation:
- `todo.py`: Pure business logic (Task dataclass, TodoList manager, add_task function)
- `main.py`: CLI handling (input prompts, output formatting, error display)

This separation enables unit testing of `todo.py` without console I/O mocking.

## Complexity Tracking

No constitution violations - no complexity justification needed.

## Phase 0: Research & Unknowns

**Status**: ✅ No research needed

All technical decisions are straightforward per constitution:
- Python stdlib only (no external dependencies)
- In-memory storage (list or dict)
- Console I/O via input()/print()
- Task dataclass with id, title, description, completed fields

## Phase 1: Design & Contracts

### Data Model (data-model.md)

**Task Dataclass**:

```python
@dataclass
class Task:
    """Represents a single todo item."""
    id: int                    # Auto-assigned, sequential, starts at 1
    title: str                 # Required, non-empty, trimmed
    description: str           # Optional, can be empty, trimmed
    completed: bool = False    # Defaults to False
```

**TodoList Manager**:

```python
class TodoList:
    """In-memory task manager."""
    
    def __init__(self) -> None:
        self._tasks: list[Task] = []
        self._next_id: int = 1
    
    def add_task(self, title: str, description: str = "") -> Task:
        """Add a new task with auto-assigned ID."""
```

### Function Contracts (contracts/)

**add_task signature**:

```python
def add_task(
    title: str,
    description: str = ""
) -> Task:
    """
    Add a new task to the todo list.
    
    Args:
        title: Task title (required, non-empty after trimming)
        description: Task description (optional, defaults to empty string)
    
    Returns:
        The newly created Task with assigned ID
    
    Raises:
        ValueError: If title is empty after trimming
    """
```

**CLI handler in main.py**:

```python
def handle_add_task(todo_list: TodoList) -> None:
    """
    CLI handler for adding tasks.
    
    Prompts user for title (required) and description (optional),
    validates input, adds task, and displays confirmation.
    """
```

### Quickstart (quickstart.md)

**How to Add a Task**:

1. Run the app: `uv run python src/main.py`
2. Select "Add Task" from menu
3. Enter title when prompted (required)
4. Enter description when prompted (optional - press Enter to skip)
5. See confirmation with assigned ID

**Example**:
```
> Add Task
Enter task title: Buy groceries
Enter task description (or press Enter to skip): Milk, eggs, bread
✓ Task added successfully with ID 1!
```

## Phase 2: Implementation Tasks Preview

Tasks will be generated by `/sp.tasks` command and will include:

1. Create project structure (src/, tests/)
2. Create Task dataclass in todo.py
3. Create TodoList class with add_task method
4. Create CLI handler in main.py
5. Add input validation and error handling
6. Manual testing of all acceptance scenarios

## Dependencies & Execution Order

1. **todo.py** (Task dataclass, TodoList class) - Foundation
2. **main.py** (CLI handler) - Depends on todo.py
3. **Testing** - Depends on both files complete

## Validation Checkpoint

Before proceeding to `/sp.tasks`:

- [ ] Data model reviewed and approved
- [ ] Function contracts match spec requirements
- [ ] Constitution check re-verified (no drift)
- [ ] Quickstart demonstrates user flow clearly

---

**Plan Status**: Ready for task generation (`/sp.tasks`)
