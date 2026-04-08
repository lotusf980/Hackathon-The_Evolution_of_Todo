# Implementation Plan: Mark as Complete

**Branch**: `5-mark-as-complete` | **Date**: 2026-02-26 | **Spec**: `specs_history/v1.0.0_mark-as-complete.spec.md`

**Input**: Feature specification for Mark as Complete - Toggle completion status of a task by ID (single command flips state)

## Summary

Implement Mark as Complete feature allowing users to toggle task completion status with a single command. Flips completed state: False→True or True→False. Includes error handling for invalid IDs and clear confirmation messages.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: None (stdlib only)
**Storage**: In-memory list (existing)
**Testing**: Manual console testing
**Target Platform**: Cross-platform console/terminal
**Project Type**: Single Python project
**Performance Goals**: <100ms operation time
**Constraints**: Zero external dependencies, PEP 8 compliance, type hints mandatory
**Scale/Scope**: MVP feature 5 of 5

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Simplicity First | ✅ PASS | Single toggle function, boolean flip |
| II. In-Memory Only | ✅ PASS | Updates in-memory completed flag only |
| III. Console-First UX | ✅ PASS | Clear confirmation of new state |
| IV. Testable by Design | ✅ PASS | Pure toggle logic, easily testable |
| V. Clean Code Standards | ✅ PASS | Type hints, PEP 8, docstrings |

**GATE RESULT**: ✅ All principles satisfied - proceed

## Project Structure

### Documentation (this feature)

```text
specs/5-mark-as-complete/
├── plan.md              # This file
├── data-model.md        # Phase 1 output (TodoList.toggle_complete method)
├── quickstart.md        # Phase 1 output (toggling tasks)
├── contracts/           # Phase 1 output (function signatures)
└── tasks.md             # Phase 2 output
```

### Source Code

```text
src/
├── __init__.py
├── main.py              # CLI toggle handler
└── todo.py              # TodoList.toggle_complete method
```

## Phase 0: Research & Unknowns

**Status**: ✅ No research needed

## Phase 1: Design & Contracts

### Data Model Extension

**TodoList.toggle_complete method**:

```python
class TodoList:
    def toggle_complete(self, task_id: int) -> bool | None:
        """
        Toggle task completion status by ID.
        
        Args:
            task_id: ID of task to toggle
        
        Returns:
            New completion status (True/False) if successful,
            None if task not found
        
        Notes:
            - Flips completed: False→True, True→False
            - Does NOT modify id, title, or description
        """
```

### Function Contracts

**CLI handler**:

```python
def handle_toggle_complete(todo_list: TodoList) -> None:
    """
    CLI handler for toggling task completion.
    
    Prompts for ID, validates input, toggles completion status,
    displays confirmation with new state or error message.
    """
```

### Error Messages

- Empty list: `"Error: No tasks exist."`
- Not found: `"Error: Task with ID {task_id} not found."`
- Invalid format: `"Error: Please enter a valid number."`
- Non-positive: `"Error: Task ID must be a positive number."`
- Success (completed): `"Task marked as complete."`
- Success (incomplete): `"Task marked as incomplete."`

### Toggle Logic

```python
# Simple boolean flip:
task.completed = not task.completed
return task.completed  # Return new state for message
```

### Quickstart

**How to Mark a Task as Complete/Incomplete**:

1. Select "Mark as Complete" from menu
2. Enter the task ID to toggle
3. See confirmation showing new state

**Example**:
```
> Mark as Complete
Enter task ID to toggle: 1
✓ Task marked as complete.

> Mark as Complete
Enter task ID to toggle: 1
✓ Task marked as incomplete.
```

## Dependencies & Execution Order

1. **todo.py** - Add toggle_complete method
2. **main.py** - Add CLI handler with state-specific messages
3. **Testing** - Verify toggle flips state correctly each time

## Validation Checkpoint

- [ ] Toggle flips completed state correctly
- [ ] Other fields (id, title, description) unchanged
- [ ] Confirmation message shows correct state
- [ ] All error scenarios handled
- [ ] View Task List reflects updated status

---

**Plan Status**: Ready for task generation (`/sp.tasks`)
