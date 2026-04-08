# Implementation Plan: View Task List

**Branch**: `4-view-task-list` | **Date**: 2026-02-26 | **Spec**: `specs_history/v1.0.0_view-task-list.spec.md`

**Input**: Feature specification for View Task List - Display all tasks in readable table format with ID, completion marker, title, description

## Summary

Implement View Task List feature displaying all tasks in a formatted, table-like structure. Shows ID, completion status ([ ] or [x]), title, and description. Handles empty state, truncation for long text, and consistent alignment.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: None (stdlib only)
**Storage**: In-memory list (existing)
**Testing**: Manual console testing
**Target Platform**: Cross-platform console/terminal
**Project Type**: Single Python project
**Performance Goals**: <100ms display time
**Constraints**: Zero external dependencies, PEP 8 compliance, type hints mandatory
**Scale/Scope**: MVP feature 4 of 5

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Simplicity First | ✅ PASS | Single display function, straightforward formatting |
| II. In-Memory Only | ✅ PASS | Read-only operation on in-memory data |
| III. Console-First UX | ✅ PASS | Formatted table output, empty state messaging |
| IV. Testable by Design | ✅ PASS | Display logic separable, testable with mock tasks |
| V. Clean Code Standards | ✅ PASS | Type hints, PEP 8, docstrings, named constants |

**GATE RESULT**: ✅ All principles satisfied - proceed

## Project Structure

### Documentation (this feature)

```text
specs/4-view-task-list/
├── plan.md              # This file
├── data-model.md        # Phase 1 output (display logic)
├── quickstart.md        # Phase 1 output (viewing tasks)
├── contracts/           # Phase 1 output (function signatures)
└── tasks.md             # Phase 2 output
```

### Source Code

```text
src/
├── __init__.py
├── main.py              # CLI view handler, formatting logic
└── todo.py              # TodoList.get_all_tasks method (if needed)
```

## Phase 0: Research & Unknowns

**Status**: ✅ No research needed

## Phase 1: Design & Contracts

### Display Format

**Table Structure**:
```
ID  Status  Title                          Description
--  ------  -----                          -----------
1   [ ]     Buy groceries                  Milk, eggs, bread
2   [x]     Finish report                  Due tomorrow...
3   [ ]     Team meeting at 3pm            Conference room A, discuss...
```

**Column Widths**:
- ID: Auto (typically 1-3 chars)
- Status: Fixed 6 chars (`[ ]` or `[x]` padded)
- Title: 40 chars max (truncate with `...`)
- Description: 50 chars max (truncate with `...`)

### Function Contracts

**Display function**:

```python
def display_task_list(todo_list: TodoList) -> None:
    """
    Display all tasks in a formatted table.
    
    Args:
        todo_list: The TodoList instance to display
    
    Notes:
        - Shows "No tasks found. Add a task to get started!" if empty
        - Truncates long titles/descriptions with ellipsis
        - Uses [ ] for incomplete, [x] for completed
        - Displays in ascending ID order
    """
```

**Helper function (optional)**:

```python
def truncate_text(text: str, max_length: int, suffix: str = "...") -> str:
    """
    Truncate text to max_length, adding suffix if truncated.
    
    Args:
        text: Text to truncate
        max_length: Maximum length (including suffix)
        suffix: Suffix to add if truncated (default "...")
    
    Returns:
        Truncated text with suffix if needed, original otherwise
    """
```

### Formatting Rules

1. **Empty state**: `"No tasks found. Add a task to get started!"`
2. **Headers**: `ID  Status  Title  Description`
3. **Separator**: Dashes under headers
4. **Completion markers**: `[ ]` incomplete, `[x]` completed
5. **Truncation**: 40 chars for title, 50 for description
6. **Newlines**: Replace with spaces in descriptions
7. **Order**: Ascending by ID

### Quickstart

**How to View Tasks**:

1. Select "View Tasks" from menu
2. See formatted task list or empty state message
3. Return to main menu

**Example**:
```
> View Tasks

ID  Status  Title                          Description
--  ------  -----                          -----------
1   [ ]     Buy groceries                  Milk, eggs, bread
2   [x]     Finish report                  Due tomorrow...
3   [ ]     Team meeting                   3pm today

Press Enter to continue...
```

## Dependencies & Execution Order

1. **todo.py** - Ensure tasks accessible (get_all_tasks or direct access)
2. **main.py** - Add display function with formatting
3. **Testing** - Verify formatting, truncation, empty state

## Validation Checkpoint

- [ ] Empty list shows friendly message
- [ ] All fields displayed correctly
- [ ] Completion markers accurate
- [ ] Long text truncated properly
- [ ] Tasks in ID order

---

**Plan Status**: Ready for task generation (`/sp.tasks`)
