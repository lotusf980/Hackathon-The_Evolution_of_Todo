# Tasks: Mark as Complete

**Input**: Design documents from `specs/5-mark-as-complete/`
**Prerequisites**: plan.md, spec.md (v1.0.0_mark-as-complete.spec.md)
**Tests**: Optional (not included - Phase 1 MVP focuses on manual testing)
**Organization**: Single user story (Mark as Complete depends on Add Task completion)

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

**Purpose**: Extend existing infrastructure for toggle functionality

**⚠️ CRITICAL**: No feature work can begin until Add Task feature is complete

- [X] T004 [P] Review `Task` dataclass in `src/todo.py` - ensure `completed` field is mutable boolean

---

## Phase 3: User Story 1 - Toggle Task Completion (Priority: P1) 🎯 MVP

**Goal**: Implement Mark as Complete feature allowing users to toggle task completion status by ID with a single command

**Independent Test**: Can toggle a task's completion status multiple times and verify it flips between complete/incomplete correctly

### Implementation for User Story 1

- [X] T005 [P] [US1] Implement `TodoList.toggle_complete(task_id: int) -> bool | None` method in `src/todo.py` with:
  - Linear search for task by ID
  - Flip `completed` field: `task.completed = not task.completed`
  - Return new completion status (True/False) if found
  - Return None if not found
  - Do NOT modify id, title, or description
- [X] T006 [US1] Create `handle_toggle_complete(todo_list: TodoList) -> None` function in `src/main.py` with:
  - Prompt for ID: "Enter task ID to toggle: "
  - Validate ID is positive integer
  - Call `todo_list.toggle_complete()` and capture result
  - Display "[OK] Task marked as complete." if result is True
  - Display "[OK] Task marked as incomplete." if result is False
  - Display "[ERROR] Task with ID {task_id} not found." if result is None
- [X] T007 [US1] Add input validation in `handle_toggle_complete` for:
  - Non-numeric input: "[ERROR] Please enter a valid number."
  - Zero or negative: "[ERROR] Task ID must be a positive number."
  - Empty list: "[ERROR] No tasks exist." before prompting for ID
- [X] T008 [US1] Integrate "Mark as Complete" option into main menu in `src/main.py`:
  - Add menu option: "5. Mark as Complete"
  - Handle selection and call `handle_toggle_complete()`

**Checkpoint**: At this point, User Story 1 should be fully functional - users can toggle task completion status

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Refinements and documentation

- [X] T009 [P] Update `README.md` with:
  - Mark as Complete feature demo with sample input/output
  - Example showing toggle behavior (complete → incomplete → complete)
  - Error message examples
- [X] T010 Run manual test: Toggle incomplete task to complete, verify `[X]` marker in View
- [X] T011 Run manual test: Toggle complete task to incomplete, verify `[ ]` marker in View
- [X] T012 Run manual test: Toggle same task 3 times, verify state flips correctly each time
- [X] T013 Run manual test: Toggle non-existent ID, verify "Task not found" message
- [X] T014 Run manual test: Toggle with invalid input (abc, -1, 0), verify appropriate error messages
- [X] T015 Code cleanup: Verify PEP 8 compliance, type hints, docstrings for toggle_complete method

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Depends on Add Task feature completion
- **Foundational (Phase 2)**: Depends on Setup verification
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Requires Add Task feature to be complete (need tasks to toggle)

### Within User Story 1

- TodoList.toggle_complete method before CLI handler
- CLI handler before menu integration

### Parallel Opportunities

- T005 (toggle_complete method) can start immediately after T004
- T009 (README update) can start after T005

---

## Implementation Strategy

### MVP First (Mark as Complete Only)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: Foundational review
3. Complete Phase 3: User Story 1 (Mark as Complete)
4. **STOP and VALIDATE**: Test Mark as Complete feature manually
5. Demo if ready

### Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to User Story 1 for traceability
- Commit after each task or logical group
- Validate Mark as Complete works with View Task List feature
- Toggle must flip state correctly each time
