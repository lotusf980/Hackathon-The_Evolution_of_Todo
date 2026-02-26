# Tasks: Add Task

**Input**: Design documents from `specs/1-add-task/`
**Prerequisites**: plan.md, spec.md (v1.0.0_add-task.spec.md)
**Tests**: Optional (not included - Phase 1 MVP focuses on manual testing)
**Organization**: Single user story (Add Task is the foundational MVP feature)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths follow plan.md structure: `src/todo.py`, `src/main.py`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create `src/` directory with `__init__.py`
- [X] T002 Create `pyproject.toml` with project metadata (name: todo-phase-1, version: 0.1.0, requires-python: ">=3.13")
- [X] T003 [P] Create `.gitignore` for Python projects (venv/, __pycache__/, .env, etc.)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No feature work can begin until this phase is complete

- [X] T004 [P] Create `src/__init__.py` with package docstring
- [X] T005 [P] Create `src/todo.py` with module docstring and imports (dataclasses, typing)
- [X] T006 [P] Create `src/main.py` with module docstring and entry point structure

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Add New Task (Priority: P1) 🎯 MVP

**Goal**: Implement Add Task feature allowing users to add tasks with title, description, and auto-assigned ID

**Independent Test**: Can add multiple tasks and verify they receive sequential IDs starting from 1, with correct title and description storage

### Implementation for User Story 1

- [X] T007 [P] [US1] Create `Task` dataclass in `src/todo.py` with fields: id (int), title (str), description (str), completed (bool = False)
- [X] T008 [P] [US1] Create `TodoList` class in `src/todo.py` with `__init__` method initializing `_tasks: list[Task]` and `_next_id: int = 1`
- [X] T009 [US1] Implement `TodoList.add_task(title: str, description: str = "") -> Task` method in `src/todo.py` with:
  - Title validation (reject empty after trimming)
  - Whitespace trimming for title and description
  - Auto-assign ID from `_next_id` and increment
  - Return created Task
- [X] T010 [US1] Add `ValueError` exception handling in `add_task` for empty title with message "Error: Task title cannot be empty."
- [X] T011 [US1] Create `handle_add_task(todo_list: TodoList) -> None` function in `src/main.py` with:
  - Prompt for title: "Enter task title: "
  - Prompt for description: "Enter task description (or press Enter to skip): "
  - Call `todo_list.add_task()` and handle ValueError
  - Display success message: "✓ Task added successfully with ID {id}!"
  - Display error message on ValueError
- [X] T012 [US1] Create main menu loop in `src/main.py` with:
  - Display menu options (1. Add Task, 2. Exit for now)
  - Handle user selection
  - Call `handle_add_task()` when option 1 selected
- [X] T013 [US1] Add `if __name__ == "__main__":` entry point in `src/main.py` to start menu loop

**Checkpoint**: At this point, User Story 1 should be fully functional - users can add tasks via console menu

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Refinements and documentation

- [X] T014 [P] Create `README.md` with:
  - Project title and description
  - Setup instructions: `uv venv`, `uv sync`
  - Run instructions: `uv run python src/main.py`
  - Demo of Add Task feature with sample input/output
- [X] T015 Run manual test: Add 3 tasks with varying titles/descriptions, verify IDs are 1, 2, 3
- [X] T016 Run manual test: Add task with empty title, verify error message displayed
- [X] T017 Run manual test: Add task with whitespace-only title, verify error message displayed
- [X] T018 Code cleanup: Verify PEP 8 compliance, type hints present, docstrings complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within User Story 1

- Models (Task dataclass) before services (TodoList)
- TodoList.add_task before CLI handler
- CLI handler before main menu integration

### Parallel Opportunities

- T001, T002, T003 can run in parallel (Setup phase)
- T004, T005, T006 can run in parallel (Foundational phase)
- T007 (Task dataclass) can start immediately after T005
- T014 (README) can start after T009 (add_task implemented)

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational tasks together:
Task: "Create src/__init__.py with package docstring"
Task: "Create src/todo.py with module docstring and imports"
Task: "Create src/main.py with module docstring and entry point structure"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Add Task)
4. **STOP and VALIDATE**: Test Add Task feature manually
5. Demo if ready

### Incremental Delivery

This tasks.md is for Add Task feature only. After completion:
- Generate tasks for View Task List (to verify tasks)
- Generate tasks for Delete, Update, Mark as Complete

### Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to User Story 1 for traceability
- Commit after each task or logical group
- Validate Add Task works before proceeding to other features
- Avoid: vague tasks, same file conflicts
