# Tasks: Update Task

**Input**: Design documents from `specs/3-update-task/`
**Prerequisites**: plan.md, spec.md (v1.0.0_update-task.spec.md)
**Tests**: Optional (not included - Phase 1 MVP focuses on manual testing)
**Organization**: Single user story (Update Task depends on Add Task completion)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths follow plan.md structure: `src/todo.py`, `src/main.py`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure from Add Task feature exists

- [X] T001 Verify `src/` directory exists with `__init__.py`
- [X] T002 Verify `src/todo.py` exists with Task dataclass and TodoList class
- [X] T003 Verify `src/main.py` exists with menu loop

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extend existing infrastructure for update functionality

**⚠️ CRITICAL**: No feature work can begin until Add Task feature is complete

- [X] T004 [P] Review `Task` dataclass in `src/todo.py` - ensure title and description fields are mutable

---

## Phase 3: User Story 1 - Update Task Title and Description (Priority: P1) 🎯 MVP

**Goal**: Implement Update Task feature allowing users to modify title and/or description with partial update support

**Independent Test**: Can update title-only, description-only, or both, and verify unchanged fields are preserved

### Implementation for User Story 1

- [X] T005 [P] [US1] Implement `TodoList.update_task(task_id: int, title: str | None = None, description: str | None = None) -> bool` method in `src/todo.py` with:
  - Linear search for task by ID
  - Update title if provided (not None)
  - Update description if provided (not None)
  - Validate new title is not empty after trimming
  - Return True if updated, False if not found
  - Do NOT modify id or completed fields
- [X] T006 [US1] Add `ValueError` exception in `update_task` for empty title with message "Task title cannot be empty."
- [X] T007 [US1] Create `handle_update_task(todo_list: TodoList) -> None` function in `src/main.py` with:
  - Prompt for ID: "Enter task ID to update: "
  - Prompt for new title: "Enter new title (or press Enter to keep current): "
  - Prompt for new description: "Enter new description (or press Enter to keep current): "
  - Pass None for empty input (to preserve current value)
  - Call `todo_list.update_task()` and handle ValueError
  - Display success: "[OK] Task updated successfully."
  - Display error messages for invalid ID, empty title
- [X] T008 [US1] Add input validation in `handle_update_task` for:
  - Non-numeric ID: "[ERROR] Please enter a valid number."
  - Zero or negative ID: "[ERROR] Task ID must be a positive number."
  - Empty list: "[ERROR] No tasks exist."
- [X] T009 [US1] Integrate "Update Task" option into main menu in `src/main.py`:
  - Add menu option: "4. Update Task"
  - Handle selection and call `handle_update_task()`

**Checkpoint**: At this point, User Story 1 should be fully functional - users can update tasks with partial updates

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Refinements and documentation

- [X] T010 [P] Update `README.md` with:
  - Update Task feature demo with sample input/output
  - Examples of partial updates (title-only, description-only)
  - Error message examples
- [X] T011 Run manual test: Update title only, verify description unchanged
- [X] T012 Run manual test: Update description only, verify title unchanged
- [X] T013 Run manual test: Update both title and description, verify both changed
- [X] T014 Run manual test: Update with empty title, verify error and no changes made
- [X] T015 Run manual test: Update non-existent ID, verify "Task not found" message
- [X] T016 Code cleanup: Verify PEP 8 compliance, type hints, docstrings for update_task method

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Depends on Add Task feature completion
- **Foundational (Phase 2)**: Depends on Setup verification
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Requires Add Task feature to be complete (need tasks to update)

### Within User Story 1

- TodoList.update_task method before CLI handler
- CLI handler before menu integration

### Parallel Opportunities

- T005 (update_task method) can start immediately after T004
- T010 (README update) can start after T005

---

## Implementation Strategy

### MVP First (Update Task Only)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: Foundational review
3. Complete Phase 3: User Story 1 (Update Task)
4. **STOP and VALIDATE**: Test Update Task feature manually
5. Demo if ready

### Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to User Story 1 for traceability
- Commit after each task or logical group
- Validate Update Task works with Add Task feature
- Partial updates must preserve unchanged fields
