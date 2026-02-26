# Implementation Plan: Delete Task

**Branch**: `2-delete-task` | **Date**: 2026-02-26 | **Spec**: `specs_history/v1.0.0_delete-task.spec.md`

**Input**: Feature specification for Delete Task - User provides ID, remove task if exists, otherwise clear error message

## Summary

Implement Delete Task feature allowing users to remove tasks by ID. Includes comprehensive error handling for non-existent IDs, empty lists, and invalid input. IDs are NOT renumbered after deletion to maintain consistency.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: None (stdlib only)
**Storage**: In-memory list (existing from Add Task)
**Testing**: Manual console testing
**Target Platform**: Cross-platform console/terminal
**Project Type**: Single Python project
**Performance Goals**: <100ms operation time
**Constraints**: Zero external dependencies, PEP 8 compliance, type hints mandatory
**Scale/Scope**: MVP feature 2 of 5

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Simplicity First | ✅ PASS | Single delete function, linear search by ID |
| II. In-Memory Only | ✅ PASS | No persistence, tasks removed from memory only |
| III. Console-First UX | ✅ PASS | Clear prompts, actionable error messages |
| IV. Testable by Design | ✅ PASS | Pure delete logic separable from I/O |
| V. Clean Code Standards | ✅ PASS | Type hints, PEP 8, docstrings |

**GATE RESULT**: ✅ All principles satisfied - proceed

## Project Structure

### Documentation (this feature)

```text
specs/2-delete-task/
├── plan.md              # This file
├── data-model.md        # Phase 1 output (TodoList.delete_task method)
├── quickstart.md        # Phase 1 output (how to delete tasks)
├── contracts/           # Phase 1 output (function signatures)
└── tasks.md             # Phase 2 output
```

### Source Code (extends Add Task structure)

```text
src/
├── __init__.py
├── main.py              # CLI delete handler
└── todo.py              # TodoList.delete_task method
```

## Phase 0: Research & Unknowns

**Status**: ✅ No research needed

All decisions straightforward per constitution and existing Add Task implementation.

## Phase 1: Design & Contracts

### Data Model Extension

**TodoList.delete_task method**:

```python
class TodoList:
    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by ID.
        
        Args:
            task_id: ID of task to delete
        
        Returns:
            True if task was found and deleted, False otherwise
        
        Notes:
            - Does NOT renumber remaining tasks
            - IDs remain unchanged after deletion
        """
```

### Function Contracts

**CLI handler**:

```python
def handle_delete_task(todo_list: TodoList) -> None:
    """
    CLI handler for deleting tasks.
    
    Prompts for ID, validates input, attempts deletion,
    displays success or appropriate error message.
    """
```

### Error Messages (from spec)

- Empty list: `"Error: No tasks exist."`
- Not found: `"Error: Task with ID {task_id} not found."`
- Invalid format: `"Error: Please enter a valid number."`
- Non-positive: `"Error: Task ID must be a positive number."`
- Success: `"Task deleted successfully."`

### Quickstart

**How to Delete a Task**:

1. Select "Delete Task" from menu
2. Enter the ID of the task to delete
3. See confirmation or error message

**Example**:
```
> Delete Task
Enter task ID to delete: 2
✓ Task deleted successfully.

> Delete Task
Enter task ID to delete: 99
✗ Error: Task with ID 99 not found.
```

## Dependencies & Execution Order

1. **todo.py** - Add delete_task method to TodoList
2. **main.py** - Add CLI handler and menu integration
3. **Testing** - Verify all error scenarios

## Validation Checkpoint

- [ ] Delete logic preserves IDs of remaining tasks
- [ ] All error scenarios handled per spec
- [ ] Success message displayed on successful delete
- [ ] Constitution check re-verified

---

**Plan Status**: Ready for task generation (`/sp.tasks`)
