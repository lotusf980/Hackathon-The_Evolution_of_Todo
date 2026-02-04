# Tasks: Phase 1 - Todo In-Memory Python Console App

**Feature**: Phase 1 - Todo In-Memory Python Console App
**Based on**: specs/1-phase1-todo/spec.md and specs/1-phase1-todo/plan.md
**Date**: 2026-02-04

## Phase 1: Setup

- [X] T001 Create project directory structure per plan
- [X] T002 Initialize pyproject.toml with Python 3.13+ requirements
- [X] T003 Create src/todo_app/__init__.py
- [X] T004 Create src/todo_app/models/__init__.py
- [X] T005 Create src/todo_app/services/__init__.py
- [X] T006 Create src/todo_app/cli/__init__.py
- [X] T007 Create tests/__init__.py
- [X] T008 Create tests/unit/__init__.py
- [X] T009 Create tests/integration/__init__.py
- [X] T010 Create README.md with project overview

## Phase 2: Foundational Components

- [X] T011 [P] Create Task model in src/todo_app/models/task.py with all required attributes
- [X] T012 [P] Create in-memory TaskStore in src/todo_app/services/task_service.py
- [X] T013 [P] Create TaskService in src/todo_app/services/task_service.py with CRUD operations
- [X] T014 [P] Create basic CLI interface in src/todo_app/cli/console_interface.py
- [X] T015 [P] Create main application entry point in src/todo_app/main.py

## Phase 3: [US1] Add Task Functionality

**Goal**: Implement ability to add new todo items with title and description

**Independent Test Criteria**:
- User can add a task with title and description
- Task gets assigned unique ID and default incomplete status
- Confirmation message is displayed

- [X] T016 [US1] Create add_task method in TaskService with validation
- [X] T017 [US1] Create CLI command for adding tasks
- [X] T018 [US1] Implement title validation (1-200 characters)
- [X] T019 [US1] Implement description validation (0-1000 characters)
- [X] T020 [US1] Add success confirmation for task creation
- [X] T021 [US1] Add error handling for invalid inputs

## Phase 4: [US2] View Task List Functionality

**Goal**: Implement ability to view all tasks with status indicators

**Independent Test Criteria**:
- User can view all tasks with ID, title, status, and description
- Clear visual indicators for task completion status
- Proper handling of empty task list

- [X] T022 [US2] Create get_all_tasks method in TaskService
- [X] T023 [US2] Create get_task_by_id method in TaskService
- [X] T024 [US2] Create CLI command for viewing all tasks
- [X] T025 [US2] Format task display with clear status indicators
- [X] T026 [US2] Handle empty task list scenario

## Phase 5: [US3] Update Task Functionality

**Goal**: Implement ability to modify existing task details

**Independent Test Criteria**:
- User can update task title and/or description
- Original completion status is preserved
- Confirmation of successful updates is provided

- [X] T027 [US3] Create update_task method in TaskService with validation
- [X] T028 [US3] Create CLI command for updating tasks
- [X] T029 [US3] Preserve completion status during updates
- [X] T030 [US3] Add success confirmation for task updates
- [X] T031 [US3] Add error handling for non-existent tasks

## Phase 6: [US4] Delete Task Functionality

**Goal**: Implement ability to remove tasks by ID

**Independent Test Criteria**:
- User can delete tasks by ID
- Confirmation of successful deletion is provided
- Prevents operations on deleted tasks

- [X] T032 [US4] Create delete_task method in TaskService
- [X] T033 [US4] Create CLI command for deleting tasks
- [X] T034 [US4] Add success confirmation for task deletion
- [X] T035 [US4] Add error handling for non-existent tasks
- [X] T036 [US4] Validate task exists before deletion

## Phase 7: [US5] Mark Complete/Incomplete Functionality

**Goal**: Implement ability to toggle task completion status

**Independent Test Criteria**:
- User can toggle completion status of tasks
- Confirmation of status change is provided
- Updated status is reflected in subsequent views

- [X] T037 [US5] Create toggle_completion method in TaskService
- [X] T038 [US5] Create CLI command for toggling task completion
- [X] T039 [US5] Add success confirmation for status change
- [X] T040 [US5] Add error handling for non-existent tasks
- [X] T041 [US5] Verify status change is reflected in views

## Phase 8: [US6] Console Interface & Navigation

**Goal**: Implement menu-driven interface with clear navigation

**Independent Test Criteria**:
- Clear menu with numbered options
- Intuitive navigation between functions
- Exit command terminates application

- [X] T042 [US6] Create main menu loop in console interface
- [X] T043 [US6] Implement menu options mapping to functions
- [X] T044 [US6] Add exit functionality
- [X] T045 [US6] Add help/instructions display
- [X] T046 [US6] Add error handling for invalid menu selections

## Phase 9: [US7] Error Handling & Validation

**Goal**: Implement comprehensive error handling and validation

**Independent Test Criteria**:
- Invalid inputs are handled gracefully
- Clear error messages are displayed
- Application doesn't crash due to user errors

- [X] T047 [US7] Add validation for all user inputs
- [X] T048 [US7] Implement error handling for non-existent task IDs
- [X] T049 [US7] Add error handling for malformed inputs
- [X] T050 [US7] Add error handling for edge cases (empty lists, etc.)
- [X] T051 [US7] Create standardized error message format

## Phase 10: Testing

- [X] T052 [P] Create unit tests for Task model in tests/unit/test_task.py
- [X] T053 [P] Create unit tests for TaskService in tests/unit/test_task_service.py
- [X] T054 [P] Create integration tests for task operations in tests/integration/test_task_service.py
- [X] T055 [P] Create conftest.py for test fixtures

## Phase 11: Polish & Cross-Cutting Concerns

- [X] T056 Add timestamp functionality to Task model
- [X] T057 Improve CLI user experience with better formatting
- [X] T058 Add input sanitization and cleaning
- [X] T059 Optimize performance to meet <1 second response time
- [X] T060 Update README.md with usage instructions
- [X] T061 Test complete application workflow
- [X] T062 Document any environment variables in .env.example

## Dependencies

- T011-T015 must complete before T016, T022, T027, T032, T037, T042
- T016 must complete before T022 (need to add tasks to view them)
- T022 must complete before T027, T032, T037 (need to verify task exists)

## Parallel Execution Opportunities

- Tasks T011-T015 can be executed in parallel as they create independent components
- Tasks T016, T022, T027, T032, T037 can be developed in parallel after foundational components are complete
- All test files (T052-T054) can be created in parallel

## Implementation Strategy

1. **MVP Scope**: Complete US1-US2 (Add and View tasks) for minimal working application
2. **Incremental Delivery**: Add one user story at a time, testing as you go
3. **Validation**: After each user story, test the complete flow before moving to the next