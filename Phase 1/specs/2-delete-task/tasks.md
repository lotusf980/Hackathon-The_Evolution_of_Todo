# Tasks: Delete Task

**Input**: Design documents from `specs/2-delete-task/`
**Prerequisites**: plan.md, spec.md (v1.0.0_delete-task.spec.md)
**Tests**: Optional (not included - Phase 1 MVP focuses on manual testing)
**Organization**: Single user story (Delete Task depends on Add Task completion)

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

**Purpose**: Extend existing infrastructure for delete functionality

**⚠️ CRITICAL**: No feature work can begin until Add Task feature is complete

- [X] T004 [P] Review `TodoList` class in `src/todo.py` - ensure `_tasks` list is accessible for deletion

---

## Phase 3: User Story 1 - Delete Existing Task (Priority: P1) 🎯 MVP

**Goal**: Implement Delete Task feature allowing users to remove tasks by ID with proper error handling

**Independent Test**: Can delete an existing task by ID and verify it is removed while other tasks remain with unchanged IDs

### Implementation for User Story 1

- [X] T005 [P] [US1] Implement `TodoList.delete_task(task_id: int) -> bool` method in `src/todo.py` with:
  - Linear search for task by ID
  - Remove task if found
  - Return True if deleted, False if not found
  - Do NOT renumber remaining tasks
- [X] T006 [US1] Create `handle_delete_task(todo_list: TodoList) -> None` function in `src/main.py` with:
  - Prompt for ID: "Enter task ID to delete: "
  - Validate ID is positive integer
  - Call `todo_list.delete_task()` and capture result
  - Display success: "[OK] Task deleted successfully." on True
  - Display error: "[ERROR] Task with ID {task_id} not found." on False
- [X] T007 [US1] Add input validation in `handle_delete_task` for:
  - Non-numeric input: "[ERROR] Please enter a valid number."
  - Zero or negative: "[ERROR] Task ID must be a positive number."
  - Empty list check: "[ERROR] No tasks exist." before prompting for ID
- [X] T008 [US1] Integrate "Delete Task" option into main menu in `src/main.py`:
  - Add menu option: "3. Delete Task"
  - Update "Exit" to option 4
  - Handle selection and call `handle_delete_task()`

**Checkpoint**: At this point, User Story 1 should be fully functional - users can delete tasks by ID

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Refinements and documentation

- [X] T009 [P] Update `README.md` with:
  - Delete Task feature demo with sample input/output
  - Error message examples (not found, invalid input, empty list)
- [X] T010 Run manual test: Add 3 tasks, delete task 2, verify tasks 1 and 3 remain with original IDs
- [X] T011 Run manual test: Delete from empty list, verify "No tasks exist" message
- [X] T012 Run manual test: Delete non-existent ID (e.g., 99), verify "Task not found" message
- [X] T013 Run manual test: Delete with invalid input (abc, -1, 0), verify appropriate error messages
- [X] T014 Code cleanup: Verify PEP 8 compliance, type hints, docstrings for delete_task method

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Depends on Add Task feature completion
- **Foundational (Phase 2)**: Depends on Setup verification
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Requires Add Task feature to be complete (need tasks to delete)

### Within User Story 1

- TodoList.delete_task method before CLI handler
- CLI handler before menu integration

### Parallel Opportunities

- T005 (delete_task method) can start immediately after T004
- T009 (README update) can start after T005

---

## Implementation Strategy

### MVP First (Delete Task Only)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: Foundational review
3. Complete Phase 3: User Story 1 (Delete Task)
4. **STOP and VALIDATE**: Test Delete Task feature manually
5. Demo if ready

### Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to User Story 1 for traceability
- Commit after each task or logical group
- Validate Delete Task works with Add Task feature
- IDs must NOT be renumbered after deletion
