# Tasks: Backend API for The Evolution of Todo - Phase II

**Input**: Design documents from `/specs/2-backend-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification or if user requests TDD approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `backend/tests/`
- Paths shown assume backend structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create backend directory structure per plan.md (backend/, backend/src/, backend/tests/)
- [ ] T002 [P] Create requirements.txt with all dependencies (FastAPI, SQLModel, psycopg2-binary, python-jose, passlib, uvicorn)
- [ ] T003 [P] Create .env.example with DATABASE_URL, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, FRONTEND_URL
- [ ] T004 [P] Create .gitignore for Python project (venv/, __pycache__/, .env, .pytest_cache/)
- [ ] T005 [P] Create pyproject.toml with project metadata and tool configurations
- [ ] T006 [P] Create README.md with project overview and setup instructions
- [ ] T007 [P] Create backend/src/__init__.py (package initialization)
- [ ] T008 [P] Create backend/tests/__init__.py (test package initialization)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 [P] Create core/config.py with Settings class (pydantic-settings, environment variables)
- [ ] T010 [P] Create core/database.py with SQLAlchemy engine, SessionLocal, Base
- [ ] T011 [P] Create core/security.py with password hashing (passlib) and JWT utilities (python-jose)
- [ ] T012 [P] Create models/__init__.py with User and Todo exports
- [ ] T013 [P] Create models/user.py with User SQLModel (id, email, hashed_password, created_at)
- [ ] T014 [P] Create models/todo.py with Todo SQLModel (id, title, notes, due_date, completed, timestamps, user_id FK)
- [ ] T015 [P] Create schemas/__init__.py with all schema exports
- [ ] T016 [P] Create schemas/auth.py with UserCreate, UserLogin, UserResponse, AuthResponse
- [ ] T017 [P] Create schemas/todo.py with TodoCreate, TodoUpdate, TodoResponse, TodosResponse
- [ ] T018 [P] Create api/__init__.py (API package initialization)
- [ ] T019 [P] Create api/deps.py with get_current_user_id dependency (JWT extraction from header)
- [ ] T020 [P] Create main.py with FastAPI app, CORS middleware, routers, health endpoints
- [ ] T021 [P] Create tests/conftest.py with pytest fixtures (test client, test database, test user)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Registration (Priority: P1) 🎯 MVP

**Goal**: Implement user registration with email/password, validation, and JWT token issuance

**Independent Test**: User can POST to /api/auth/register with email/password and receive JWT token. Duplicate emails rejected. Passwords hashed.

### Implementation for User Story 1

- [ ] T022 [P] [US1] Create services/__init__.py (services package)
- [ ] T023 [P] [US1] Create services/auth_service.py with register_user function
- [ ] T024 [US1] Implement email uniqueness validation in register_user
- [ ] T025 [US1] Implement password validation (min 8 chars, at least 1 number)
- [ ] T026 [US1] Implement password hashing with bcrypt (cost factor 12)
- [ ] T027 [US1] Create api/routes/__init__.py (routes package)
- [ ] T028 [US1] Create api/routes/auth.py with register endpoint (POST /api/auth/register)
- [ ] T029 [US1] Implement JWT token creation with user_id in payload
- [ ] T030 [US1] Add 400 response for duplicate email
- [ ] T031 [US1] Add 400 response for weak password
- [ ] T032 [US1] Return 201 with user data and JWT token on success

**Checkpoint**: At this point, User Story 1 should be fully functional - users can register and receive JWT token

---

## Phase 4: User Story 2 - User Sign-In (Priority: P1) 🎯 MVP

**Goal**: Implement user authentication with email/password and JWT token issuance

**Independent Test**: User can POST to /api/auth/login with credentials and receive JWT token. Invalid credentials return 401.

### Implementation for User Story 2

- [ ] T033 [P] [US2] Add login function to services/auth_service.py
- [ ] T034 [US2] Implement email lookup and password verification
- [ ] T035 [US2] Return generic "Invalid credentials" for both wrong email and wrong password
- [ ] T036 [US2] Create login endpoint in api/routes/auth.py (POST /api/auth/login)
- [ ] T037 [US2] Return 401 for invalid credentials
- [ ] T038 [US2] Return 200 with user data and JWT token on success
- [ ] T039 [US2] Set token expiration to 60 minutes
- [ ] T040 [US2] Add tests for successful login
- [ ] T041 [US2] Add tests for failed login (wrong email, wrong password)

**Checkpoint**: At this point, User Story 2 should be fully functional - users can sign in and receive JWT token

---

## Phase 5: User Story 3 - Create Todo (Priority: P1) 🎯 MVP

**Goal**: Implement todo creation with title validation and automatic user_id assignment

**Independent Test**: Authenticated user can POST to /api/todos with title. user_id auto-set from JWT. Returns 201 with created todo.

### Implementation for User Story 3

- [ ] T042 [P] [US3] Create services/todo_service.py with create_todo function
- [ ] T043 [P] [US3] Implement title validation (required, 1-200 chars)
- [ ] T044 [US3] Implement notes validation (optional, max 1000 chars)
- [ ] T045 [US3] Implement due_date validation (optional, ISO format YYYY-MM-DD)
- [ ] T046 [US3] Auto-set user_id from JWT token (never from request body)
- [ ] T047 [US3] Create api/routes/todos.py with create endpoint (POST /api/todos)
- [ ] T048 [US3] Add Depends(get_current_user_id) for authentication
- [ ] T049 [US3] Return 201 with created todo on success
- [ ] T050 [US3] Return 400 for validation errors (missing title, invalid format)
- [ ] T051 [US3] Return 401 for unauthenticated requests

**Checkpoint**: At this point, User Story 3 should be fully functional - authenticated users can create todos

---

## Phase 6: User Story 4 - View My Todos (Priority: P1) 🎯 MVP

**Goal**: Implement todo list retrieval with user isolation and sorting

**Independent Test**: GET /api/todos returns only authenticated user's todos, sorted by created_at DESC. User isolation enforced.

### Implementation for User Story 4

- [ ] T052 [P] [US4] Add list_todos function to services/todo_service.py
- [ ] T053 [P] [US4] Implement WHERE user_id = :user_id filter (user isolation)
- [ ] T054 [US4] Implement ORDER BY created_at DESC sorting
- [ ] T055 [US4] Create list endpoint in api/routes/todos.py (GET /api/todos)
- [ ] T056 [US4] Return 200 with todos array (empty array if no todos)
- [ ] T057 [US4] Add get_todo_by_id function for single todo retrieval
- [ ] T058 [US4] Create get endpoint (GET /api/todos/{id})
- [ ] T059 [US4] Return 404 if todo doesn't exist or doesn't belong to user
- [ ] T060 [US4] Return 200 with todo object on success
- [ ] T061 [US4] Add tests for user isolation (User A cannot see User B's todos)

**Checkpoint**: At this point, User Story 4 should be fully functional - users can view their own todos only

---

## Phase 7: User Story 5 - Update Todo (Priority: P2)

**Goal**: Implement todo update with partial update support and ownership validation

**Independent Test**: Authenticated user can PUT to /api/todos/{id} with partial data. Only owner can update. Returns updated todo.

### Implementation for User Story 5

- [ ] T062 [P] [US5] Add update_todo function to services/todo_service.py
- [ ] T063 [P] [US5] Implement ownership check (return 404 if not owner)
- [ ] T064 [US5] Implement partial update (only update provided fields)
- [ ] T065 [US5] Update updated_at timestamp on modification
- [ ] T066 [US5] Create update endpoint in api/routes/todos.py (PUT /api/todos/{id})
- [ ] T067 [US5] Return 404 if todo doesn't exist or user doesn't own it
- [ ] T068 [US5] Return 200 with updated todo on success
- [ ] T069 [US5] Return 400 for validation errors
- [ ] T070 [US5] Add tests for ownership enforcement

**Checkpoint**: At this point, User Story 5 should be fully functional - users can update their own todos

---

## Phase 8: User Story 6 - Mark Todo Complete (Priority: P2)

**Goal**: Implement completion toggle with optimistic update support

**Independent Test**: PATCH /api/todos/{id}/complete toggles completed status. Only owner can toggle. Returns updated todo.

### Implementation for User Story 6

- [ ] T071 [P] [US6] Add toggle_complete function to services/todo_service.py
- [ ] T072 [P] [US6] Implement ownership validation
- [ ] T073 [US6] Create toggle endpoint in api/routes/todos.py (PATCH /api/todos/{id}/complete)
- [ ] T074 [US6] Accept completed boolean in request body
- [ ] T075 [US6] Return 404 if todo doesn't exist or user doesn't own it
- [ ] T076 [US6] Return 200 with updated todo on success
- [ ] T077 [US6] Add tests for completion toggle
- [ ] T078 [US6] Add tests for persistence after refresh

**Checkpoint**: At this point, User Story 6 should be fully functional - users can mark their todos complete/incomplete

---

## Phase 9: User Story 7 - Delete Todo (Priority: P2)

**Goal**: Implement permanent todo deletion with ownership validation

**Independent Test**: DELETE /api/todos/{id} removes todo permanently. Only owner can delete. Returns success confirmation.

### Implementation for User Story 7

- [ ] T079 [P] [US7] Add delete_todo function to services/todo_service.py
- [ ] T080 [P] [US7] Implement ownership check (return 404 if not owner)
- [ ] T081 [US7] Implement permanent deletion (no soft delete)
- [ ] T082 [US7] Create delete endpoint in api/routes/todos.py (DELETE /api/todos/{id})
- [ ] T083 [US7] Return 404 if todo doesn't exist or user doesn't own it
- [ ] T084 [US7] Return 200 with success message on deletion
- [ ] T085 [US7] Add tests for deletion
- [ ] T086 [US7] Add tests for ownership enforcement on delete

**Checkpoint**: At this point, User Story 7 should be fully functional - users can delete their own todos

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, error handling, logging, documentation

- [ ] T087 [P] Add custom exception handler for HTTPException (consistent error format)
- [ ] T088 [P] Add logging for all requests (method, path, status, duration)
- [ ] T089 [P] Add database error handling (503 for connection failures)
- [ ] T090 [P] Add input sanitization (prevent SQL injection via parameterized queries)
- [ ] T091 [P] Verify CORS configuration allows frontend origin
- [ ] T092 [P] Test all endpoints with Swagger UI (/docs)
- [ ] T093 [P] Create comprehensive API documentation in README.md
- [ ] T094 [P] Add OpenAPI schema export to contracts/openapi.json
- [ ] T095 [P] Run full integration test suite
- [ ] T096 [P] Verify user isolation with cross-user access tests
- [ ] T097 [P] Performance testing (p95 latency < 200ms)
- [ ] T098 [P] Security audit (password hashing, JWT validation, SQL injection prevention)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Registration)**: Can start after Foundational - No dependencies
- **User Story 2 (P1 - Sign-In)**: Can start after Foundational - Independent
- **User Story 3 (P1 - Create Todo)**: Depends on US1/US2 (need authentication first)
- **User Story 4 (P1 - View Todos)**: Depends on US1/US2 (need authentication first)
- **User Story 5 (P2 - Update)**: Depends on US3/US4 (need todos to exist)
- **User Story 6 (P2 - Complete)**: Depends on US3/US4 (need todos to exist)
- **User Story 7 (P2 - Delete)**: Depends on US3/US4 (need todos to exist)
- **User Story 8 (P1 - User Isolation)**: Cross-cutting, tested in all CRUD operations

### Within Each User Story

- Services before routes
- Core logic before endpoints
- Success cases before error cases
- Tests (if included) after implementation

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T008)
- All Foundational tasks marked [P] can run in parallel (T009-T021)
- Once Foundational is done:
  - Developer A: User Story 1 (Registration)
  - Developer B: User Story 2 (Sign-In) - can start immediately
  - Developer C: User Story 3 & 4 (Create & View) - after auth ready
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (Registration)

```bash
# Launch all registration tasks together:
Task: "T023 [P] [US1] Create services/auth_service.py with register_user function"
Task: "T024 [US1] Implement email uniqueness validation"
Task: "T025 [US1] Implement password validation"

# These can run in parallel - different files, no dependencies
```

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational tasks together:
Task: "T009 [P] Create core/config.py"
Task: "T010 [P] Create core/database.py"
Task: "T011 [P] Create core/security.py"
Task: "T013 [P] Create models/user.py"
Task: "T014 [P] Create models/todo.py"
Task: "T016 [P] Create schemas/auth.py"
Task: "T017 [P] Create schemas/todo.py"

# All these tasks affect different files - can run in parallel
```

---

## Implementation Strategy

### MVP First (User Stories 1-4 + User Isolation)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Registration)
4. Complete Phase 4: User Story 2 (Sign-In)
5. Complete Phase 5: User Story 3 (Create Todo)
6. Complete Phase 6: User Story 4 (View Todos)
7. **STOP and VALIDATE**: Test MVP flow (register → login → create todo → view todos)
8. Verify user isolation (User A cannot see User B's todos)
9. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Registration) → Test independently → Deploy/Demo (Auth foundation!)
3. Add User Story 2 (Sign-In) → Test independently → Deploy/Demo (Full auth!)
4. Add User Story 3 (Create Todo) → Test independently → Deploy/Demo (Can create!)
5. Add User Story 4 (View Todos) → Test independently → Deploy/Demo (Full CRUD!)
6. Add User Story 5 (Update) → Test independently → Deploy/Demo
7. Add User Story 6 (Complete) → Test independently → Deploy/Demo
8. Add User Story 7 (Delete) → Test independently → Deploy/Demo (Complete!)
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Registration)
   - Developer B: User Story 2 (Sign-In)
3. After auth stories complete:
   - Developer A: User Story 3 (Create Todo)
   - Developer B: User Story 4 (View Todos)
4. After CRUD read/write complete:
   - Developer A: User Story 5 (Update)
   - Developer B: User Story 6 (Complete)
   - Developer C: User Story 7 (Delete)
5. All developers: Phase 10 (Polish & Cross-Cutting)

---

## Task Summary

| Phase | User Story | Task Count | Priority |
|-------|-----------|------------|----------|
| Phase 1 | Setup | 8 | N/A |
| Phase 2 | Foundational | 13 | N/A |
| Phase 3 | US1: Registration | 11 | P1 (MVP) |
| Phase 4 | US2: Sign-In | 9 | P1 (MVP) |
| Phase 5 | US3: Create Todo | 10 | P1 (MVP) |
| Phase 6 | US4: View List | 10 | P1 (MVP) |
| Phase 7 | US5: Update | 9 | P2 |
| Phase 8 | US6: Complete | 8 | P2 |
| Phase 9 | US7: Delete | 8 | P2 |
| Phase 10 | Polish | 12 | N/A |
| **Total** | **All** | **98** | **All** |

**MVP Scope** (P1 stories only): Phases 1-6 = **61 tasks**

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are OPTIONAL - include only if explicitly requested or TDD approach desired
- User isolation (US8) is tested across all CRUD operations, not a separate phase

---

**Ready for Implementation**: All tasks are specific enough that an LLM agent can complete them without additional context. Each task includes exact file paths and clear acceptance criteria.

**Next Command**: `/sp.implement` to begin implementation in priority order (P1 → P2)
