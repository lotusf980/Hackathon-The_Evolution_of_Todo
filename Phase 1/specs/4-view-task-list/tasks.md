# Tasks: View Task List

**Input**: Design documents from `specs/4-view-task-list/`
**Prerequisites**: plan.md, spec.md (v1.0.0_view-task-list.spec.md)
**Tests**: Optional (not included - Phase 1 MVP focuses on manual testing)
**Organization**: Single user story (View Task List depends on Add Task completion)

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

- [ ] T001 Verify `src/` directory exists with `__init__.py`
- [ ] T002 Verify `src/todo.py` exists with Task dataclass and TodoList class
- [ ] T003 Verify `src/main.py` exists with menu loop

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extend existing infrastructure for view functionality

**⚠️ CRITICAL**: No feature work can begin until Add Task feature is complete

- [ ] T004 [P] Review `TodoList` class in `src/todo.py` - ensure tasks are accessible for iteration

---

## Phase 3: User Story 1 - View All Tasks (Priority: P1) 🎯 MVP

**Goal**: Implement View Task List feature displaying all tasks in a formatted table with ID, completion marker, title, and description

**Independent Test**: Can view all tasks and verify correct formatting, completion markers, and empty state handling

### Implementation for User Story 1

- [ ] T005 [P] [US1] Create `truncate_text(text: str, max_length: int, suffix: str = "...") -> str` helper function in `src/main.py` with:
  - Return original text if length <= max_length
  - Return truncated text + suffix if length > max_length
  - Ensure total length including suffix <= max_length
- [ ] T006 [P] [US1] Create `display_task_list(todo_list: TodoList) -> None` function in `src/main.py` with:
  - Check if task list is empty
  - Display "No tasks found. Add a task to get started!" if empty
  - Display table headers: "ID  Status  Title  Description"
  - Display separator line with dashes
  - Iterate through tasks in ascending ID order
- [ ] T007 [US1] Implement task row formatting in `display_task_list`:
  - Display ID as integer
  - Display status as `[ ]` (incomplete) or `[x]` (completed)
  - Display title truncated to 40 characters
  - Display description truncated to 50 characters
  - Replace newlines in description with spaces
- [ ] T008 [US1] Integrate "View Tasks" option into main menu in `src/main.py`:
  - Add menu option: "4. View Tasks"
  - Handle selection and call `display_task_list()`
  - Add "Press Enter to continue..." prompt after display

**Checkpoint**: At this point, User Story 1 should be fully functional - users can view formatted task list

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Refinements and documentation

- [ ] T009 [P] Update `README.md` with:
  - View Task List feature demo with sample output showing table format
  - Examples of truncation for long titles/descriptions
  - Empty state message example
- [ ] T010 Run manual test: View empty list, verify "No tasks found" message
- [ ] T011 Run manual test: Add 3 tasks, view list, verify all displayed with correct IDs and formatting
- [ ] T012 Run manual test: Add task with long title (50+ chars), verify truncation with ellipsis
- [ ] T013 Run manual test: Add task with long description (70+ chars), verify truncation with ellipsis
- [ ] T014 Run manual test: Mark task complete, view list, verify `[x]` marker
- [ ] T015 Code cleanup: Verify PEP 8 compliance, type hints, docstrings for display functions
- [ ] T016 Verify column alignment is consistent and readable

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Depends on Add Task feature completion
- **Foundational (Phase 2)**: Depends on Setup verification
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Requires Add Task feature to be complete (need tasks to view)

### Within User Story 1

- truncate_text helper before display_task_list
- display_task_list before menu integration

### Parallel Opportunities

- T005 (truncate_text) can start immediately after T004
- T009 (README update) can start after T006

---

## Implementation Strategy

### MVP First (View Task List Only)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: Foundational review
3. Complete Phase 3: User Story 1 (View Task List)
4. **STOP and VALIDATE**: Test View Task List feature manually
5. Demo if ready

### Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to User Story 1 for traceability
- Commit after each task or logical group
- Validate View Task List works with Add Task feature
- Table formatting must be consistent and readable
