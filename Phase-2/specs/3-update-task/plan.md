# Implementation Plan: Update Task

**Branch**: `3-update-task` | **Date**: 2026-02-26 | **Spec**: `specs_history/v1.0.0_update-task.spec.md`

**Input**: Feature specification for Update Task - User provides ID + new title and/or description (partial updates allowed)

## Summary

Implement Update Task feature allowing users to modify title and/or description of existing tasks. Supports partial updates (title-only or description-only). Preserves ID and completion status. Includes validation and error handling.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: None (stdlib only)
**Storage**: In-memory list (existing)
**Testing**: Manual console testing
**Target Platform**: Cross-platform console/terminal
**Project Type**: Single Python project
**Performance Goals**: <100ms operation time
**Constraints**: Zero external dependencies, PEP 8 compliance, type hints mandatory
**Scale/Scope**: MVP feature 3 of 5

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Simplicity First | ✅ PASS | Single update function with optional parameters |
| II. In-Memory Only | ✅ PASS | Updates in-memory data only |
| III. Console-First UX | ✅ PASS | Clear prompts, optional field handling |
| IV. Testable by Design | ✅ PASS | Pure update logic, testable without I/O |
| V. Clean Code Standards | ✅ PASS | Type hints, PEP 8, docstrings |

**GATE RESULT**: ✅ All principles satisfied - proceed

## Project Structure

### Documentation (this feature)

```text
specs/3-update-task/
├── plan.md              # This file
├── data-model.md        # Phase 1 output (TodoList.update_task method)
├── quickstart.md        # Phase 1 output (how to update tasks)
├── contracts/           # Phase 1 output (function signatures)
└── tasks.md             # Phase 2 output
```

### Source Code (extends existing structure)

```text
src/
├── __init__.py
├── main.py              # CLI update handler
└── todo.py              # TodoList.update_task method
```

## Phase 0: Research & Unknowns

**Status**: ✅ No research needed

## Phase 1: Design & Contracts

### Data Model Extension

**TodoList.update_task method**:

```python
class TodoList:
    def update_task(
        self,
        task_id: int,
        title: str | None = None,
        description: str | None = None
    ) -> bool:
        """
        Update task title and/or description by ID.
        
        Args:
            task_id: ID of task to update
            title: New title (None to keep current)
            description: New description (None to keep current)
        
        Returns:
            True if task was found and updated, False otherwise
        
        Raises:
            ValueError: If new title is empty after trimming
        
        Notes:
            - None values preserve existing field
            - Empty string ("") is valid for description
            - Empty string ("") is INVALID for title (raises ValueError)
            - Does NOT modify id or completed fields
        """
```

### Function Contracts

**CLI handler**:

```python
def handle_update_task(todo_list: TodoList) -> None:
    """
    CLI handler for updating tasks.
    
    Prompts for ID, validates, prompts for new title/description
    (with instructions to skip for no change), updates task,
    displays confirmation or error.
    """
```

### Error Messages

- Empty list: `"Error: No tasks exist."`
- Not found: `"Error: Task with ID {task_id} not found."`
- Empty title: `"Error: Task title cannot be empty."`
- Invalid ID format: `"Error: Please enter a valid number."`
- Success: `"Task updated successfully."`

### Partial Update Logic

```python
# User input handling:
# - Empty input (just Enter) → None → keep current value
# - Non-empty input → trimmed string → update field
# - Empty input for title → error, re-prompt
# - Empty input for description → valid, set to ""
```

### Quickstart

**How to Update a Task**:

1. Select "Update Task" from menu
2. Enter the task ID to update
3. Enter new title (or press Enter to keep current)
4. Enter new description (or press Enter to keep current)
5. See confirmation or error

**Example**:
```
> Update Task
Enter task ID to update: 1
Enter new title (or press Enter to keep current): Buy organic milk
Enter new description (or press Enter to keep current): 
✓ Task updated successfully.
```

## Dependencies & Execution Order

1. **todo.py** - Add update_task method
2. **main.py** - Add CLI handler with partial update prompts
3. **Testing** - Verify partial updates preserve unchanged fields

## Validation Checkpoint

- [ ] Partial updates work correctly (title-only, description-only)
- [ ] Empty title rejected, empty description accepted
- [ ] ID and completed status unchanged
- [ ] All error scenarios handled

---

**Plan Status**: Ready for task generation (`/sp.tasks`)
