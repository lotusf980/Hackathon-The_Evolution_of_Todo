# Feature Specification: Backend API for The Evolution of Todo - Phase II

**Feature Branch**: `2-backend-api`
**Created**: 2025-12-30
**Status**: Draft
**Input**: User description: Backend for The Evolution of Todo - Phase II: Full-Stack Web Application

## User Scenarios & Testing

### User Story 1 - User Registration (Priority: P1) 🎯 MVP

As a new user, I want to create an account with my email and password so that I can securely access the todo application and have my data privately stored.

**Why this priority**: User registration is the entry point for all authenticated operations. Without user accounts, multi-user isolation and data persistence cannot function.

**Independent Test**: User can submit registration form with email/password and receive a valid JWT token. Account is created in database with hashed password. Email must be unique.

**Acceptance Scenarios**:

1. **Given** I am on the sign-up page, **When** I submit valid email and password (min 8 chars, 1 number), **Then** my account is created and I receive a JWT token
2. **Given** I am registering, **When** I use an email that already exists, **Then** I receive a clear error message and registration is rejected
3. **Given** I am registering, **When** my password is too short or lacks a number, **Then** I receive a validation error with specific requirements
4. **Given** I just registered, **When** I check the database, **Then** my password is securely hashed (not stored in plain text)
5. **Given** I have a valid JWT token, **When** I make authenticated API requests, **Then** my requests are accepted and processed

---

### User Story 2 - User Sign-In (Priority: P1) 🎯 MVP

As a registered user, I want to sign in with my credentials so that I can access my personal todo list with a valid authentication token.

**Why this priority**: Sign-in is required for returning users to access their data. JWT tokens enable stateless authentication across frontend/backend boundary.

**Independent Test**: User can submit email/password and receive JWT token on success. Invalid credentials return 401 error. Token works for authenticated endpoints.

**Acceptance Scenarios**:

1. **Given** I have an account, **When** I submit correct email and password, **Then** I receive a valid JWT token with my user ID
2. **Given** I am signing in, **When** I enter wrong email or password, **Then** I receive a generic "Invalid credentials" error (not revealing which is wrong)
3. **Given** I have a valid token, **When** I access protected endpoints, **Then** my requests succeed with proper user isolation
4. **Given** my token expires, **When** I try to access protected endpoints, **Then** I receive 401 Unauthorized and am redirected to sign-in
5. **Given** I sign in from multiple devices, **When** I use the same credentials, **Then** each device gets its own valid token

---

### User Story 3 - Create Todo (Priority: P1) 🎯 MVP

As an authenticated user, I want to create new todo items with title, optional notes, and due date so that I can capture tasks I need to accomplish.

**Why this priority**: Creating todos is the core value proposition. This is the primary action users perform to track their tasks.

**Independent Test**: Authenticated user can POST to /api/todos with title (required), notes (optional), due_date (optional). Response includes created todo with user_id automatically set.

**Acceptance Scenarios**:

1. **Given** I am authenticated, **When** I POST a valid todo with title, **Then** it is created with my user_id and returned with 201 status
2. **Given** I am creating a todo, **When** I omit the title, **Then** I receive a 400 validation error
3. **Given** I am creating a todo, **When** I include notes and due_date, **Then** they are saved correctly
4. **Given** I create multiple todos, **When** I list my todos, **Then** they appear sorted by creation date (newest first)
5. **Given** I am NOT authenticated, **When** I try to create a todo, **Then** I receive 401 Unauthorized

---

### User Story 4 - View My Todos (Priority: P1) 🎯 MVP

As an authenticated user, I want to retrieve all my todos so that I can see what tasks I need to accomplish in an organized list.

**Why this priority**: Viewing todos is essential for users to interact with their tasks. User isolation ensures I only see MY todos, never others'.

**Independent Test**: GET /api/todos returns only the authenticated user's todos, sorted by created_at DESC. Empty list returns 200 with empty array.

**Acceptance Scenarios**:

1. **Given** I am authenticated, **When** I GET /api/todos, **Then** I receive only my todos (never other users' todos)
2. **Given** I have no todos, **When** I GET /api/todos, **Then** I receive 200 with empty todos array
3. **Given** I have many todos, **When** I GET /api/todos, **Then** they are sorted by created_at descending (newest first)
4. **Given** I am NOT authenticated, **When** I GET /api/todos, **Then** I receive 401 Unauthorized
5. **Given** I have todos with various completion states, **When** I GET /api/todos, **Then** both active and completed todos are returned

---

### User Story 5 - Update Todo (Priority: P2)

As an authenticated user, I want to modify my existing todos so that I can keep my tasks accurate as my plans change.

**Why this priority**: Tasks evolve. Users need to update titles, add notes, or change due dates without deleting and recreating todos.

**Independent Test**: Authenticated user can PUT to /api/todos/{id} with partial or full update. Only the todo owner can update it. Returns updated todo.

**Acceptance Scenarios**:

1. **Given** I own a todo, **When** I PUT valid updates, **Then** my changes are saved and the updated todo is returned
2. **Given** I try to update someone else's todo, **When** I make a PUT request, **Then** I receive 404 Not Found (not revealing the todo exists)
3. **Given** I am updating, **When** I only send title, **Then** only title is updated (partial update supported)
4. **Given** I update a todo, **When** I check updated_at, **Then** it reflects the modification timestamp
5. **Given** the todo doesn't exist, **When** I try to update it, **Then** I receive 404 Not Found

---

### User Story 6 - Mark Todo Complete (Priority: P2)

As an authenticated user, I want to toggle the completion status of my todos so that I can track my progress and feel a sense of accomplishment.

**Why this priority**: Marking tasks complete provides psychological reward and helps users track progress. It's a frequent, satisfying interaction.

**Independent Test**: PATCH /api/todos/{id}/complete with completed=true/false toggles status. Only owner can toggle. Returns updated todo.

**Acceptance Scenarios**:

1. **Given** I own an active todo, **When** I PATCH completed=true, **Then** the todo is marked complete and returned
2. **Given** I own a completed todo, **When** I PATCH completed=false, **Then** the todo is marked active and returned
3. **Given** I try to complete someone else's todo, **When** I make a PATCH request, **Then** I receive 404 Not Found
4. **Given** I mark a todo complete, **When** I refresh or re-fetch, **Then** the completion status persists
5. **Given** the todo doesn't exist, **When** I try to complete it, **Then** I receive 404 Not Found

---

### User Story 7 - Delete Todo (Priority: P2)

As an authenticated user, I want to permanently delete my todos so that I can remove tasks I no longer need and keep my list focused.

**Why this priority**: Deleting unwanted tasks reduces cognitive load and keeps the todo list relevant. Essential for list maintenance.

**Independent Test**: DELETE /api/todos/{id} removes the todo permanently. Only owner can delete. Returns success confirmation.

**Acceptance Scenarios**:

1. **Given** I own a todo, **When** I DELETE it, **Then** it is permanently removed and I receive success confirmation
2. **Given** I try to delete someone else's todo, **When** I make a DELETE request, **Then** I receive 404 Not Found
3. **Given** I delete a todo, **When** I GET /api/todos, **Then** the deleted todo is no longer in my list
4. **Given** the todo doesn't exist, **When** I try to delete it, **Then** I receive 404 Not Found
5. **Given** I delete a todo, **When** I check the database, **Then** the todo is permanently gone (soft delete not implemented)

---

### User Story 8 - User Isolation Enforcement (Priority: P1) 🎯 MVP

As a user, I want my todo data to be completely isolated from other users so that I can trust the application with my personal tasks and information.

**Why this priority**: Security and privacy are non-negotiable. User isolation is the core security guarantee of the multi-user system.

**Independent Test**: Every authenticated endpoint automatically filters by user_id. No query can return another user's data. Tested via integration tests.

**Acceptance Scenarios**:

1. **Given** I am User A, **When** I GET /api/todos, **Then** I never see User B's todos (even if they exist)
2. **Given** I am User A, **When** I try to access User B's todo by ID, **Then** I receive 404 Not Found
3. **Given** I am User A, **When** I try to update User B's todo, **Then** I receive 404 Not Found
4. **Given** I am User A, **When** I try to delete User B's todo, **Then** I receive 404 Not Found
5. **Given** I have a valid JWT, **When** I inspect the token payload, **Then** it contains my user_id for server-side verification

---

### Edge Cases

- **Database connection lost**: Return 503 Service Unavailable with retry-after header
- **JWT token malformed**: Return 401 Unauthorized with "Invalid token" message
- **JWT token expired**: Return 401 Unauthorized with "Token expired" message
- **Duplicate email registration**: Return 400 Bad Request with "Email already registered"
- **Invalid JSON in request body**: Return 400 Bad Request with "Invalid JSON" message
- **Missing required fields**: Return 400 Bad Request with specific field validation errors
- **SQL injection attempt**: Parameterized queries prevent injection; return 400 if malformed
- **Concurrent modifications**: Last write wins; updated_at timestamp tracks changes
- **Very long input strings**: Enforce max lengths (title: 200, notes: 1000)
- **Invalid date format**: Return 400 with "Invalid date format, use YYYY-MM-DD"

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide user registration with email and password
- **FR-002**: System MUST validate email uniqueness (no duplicate accounts)
- **FR-003**: System MUST validate password strength (min 8 characters, at least 1 number)
- **FR-004**: System MUST hash passwords before storing (bcrypt or equivalent)
- **FR-005**: System MUST provide user sign-in with email/password authentication
- **FR-006**: System MUST issue JWT tokens on successful authentication
- **FR-007**: System MUST include user_id in JWT token payload
- **FR-008**: System MUST set JWT token expiration (60 minutes from issuance)
- **FR-009**: System MUST provide todo creation endpoint (POST /api/todos)
- **FR-010**: System MUST validate todo title is provided (required field, 1-200 characters)
- **FR-011**: System MUST accept optional notes (max 1000 characters) and due_date (ISO format)
- **FR-012**: System MUST automatically set user_id from JWT token (not from request body)
- **FR-013**: System MUST provide todo list endpoint (GET /api/todos)
- **FR-014**: System MUST filter todos by authenticated user_id (user isolation)
- **FR-015**: System MUST sort todos by created_at descending (newest first)
- **FR-016**: System MUST provide single todo retrieval (GET /api/todos/{id})
- **FR-017**: System MUST return 404 if todo doesn't exist or doesn't belong to user
- **FR-018**: System MUST provide todo update endpoint (PUT /api/todos/{id})
- **FR-019**: System MUST support partial updates (only provided fields are updated)
- **FR-020**: System MUST provide completion toggle endpoint (PATCH /api/todos/{id}/complete)
- **FR-021**: System MUST provide todo deletion endpoint (DELETE /api/todos/{id})
- **FR-022**: System MUST permanently delete todos (no soft delete)
- **FR-023**: System MUST return 401 for all unauthenticated requests to protected endpoints
- **FR-024**: System MUST return 404 for all operations on non-existent or non-owned todos
- **FR-025**: System MUST validate and sanitize all input to prevent SQL injection
- **FR-026**: System MUST use parameterized queries for all database operations
- **FR-027**: System MUST enable CORS for frontend origin (http://localhost:3000)
- **FR-028**: System MUST return consistent error response format with status code and message

### Key Entities

- **User**: Represents an authenticated user with unique email, hashed password, unique ID (UUID), and creation timestamp. Owns multiple todos.
- **Todo**: Represents a task with title (required), notes (optional), due_date (optional), completion status (boolean), timestamps (created_at, updated_at), and owner (user_id foreign key).
- **JWT Token**: Represents authentication session with user_id in subject claim, email in payload, expiration timestamp, signed with shared secret.

## Success Criteria

### Measurable Outcomes

- **SC-001**: New users can complete registration and receive valid JWT token in under 5 seconds
- **SC-002**: All authenticated API requests complete in under 200ms (p95 latency)
- **SC-003**: System correctly rejects 100% of unauthorized access attempts (zero false positives)
- **SC-004**: System correctly allows 100% of authorized operations (zero false negatives)
- **SC-005**: User isolation is absolute - no user can access another user's data under any circumstances
- **SC-006**: All validation errors return helpful, specific error messages (no generic "An error occurred")
- **SC-007**: Database operations maintain data integrity (foreign key constraints, cascading deletes)
- **SC-008**: API documentation is complete and accurate (all endpoints, request/response schemas)

## Assumptions

- Users have modern web browsers with JavaScript enabled (frontend handles API calls)
- Frontend properly stores and attaches JWT tokens to requests
- Shared secret (BETTER_AUTH_SECRET) is identical between frontend and backend
- PostgreSQL database is available and properly configured
- Database schema is created automatically on application startup
- Single database instance (no sharding or replication for MVP)
- Email addresses are unique identifiers (no username system)
- Password reset is not required for MVP (can be added in Phase III)
- Rate limiting is not required for MVP (can be added for production)
- Logging and monitoring are handled at infrastructure level

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required | Request Body | Response |
|--------|----------|-------------|---------------|--------------|----------|
| POST | /api/auth/register | Create new user account | No | `{ email, password }` | `{ user, token, expires_at }` |
| POST | /api/auth/login | Sign in existing user | No | `{ email, password }` | `{ user, token, expires_at }` |

### Todos

| Method | Endpoint | Description | Auth Required | Request Body | Response |
|--------|----------|-------------|---------------|--------------|----------|
| POST | /api/todos | Create new todo | Yes (JWT) | `{ title, notes?, due_date? }` | `{ todo }` |
| GET | /api/todos | List user's todos | Yes (JWT) | - | `{ todos: [] }` |
| GET | /api/todos/{id} | Get specific todo | Yes (JWT) | - | `{ todo }` |
| PUT | /api/todos/{id} | Update todo | Yes (JWT) | `{ title?, notes?, due_date?, completed? }` | `{ todo }` |
| PATCH | /api/todos/{id}/complete | Toggle completion | Yes (JWT) | `{ completed: boolean }` | `{ todo }` |
| DELETE | /api/todos/{id} | Delete todo | Yes (JWT) | - | `{ success: boolean }` |

### Error Response Format

```json
{
  "detail": "Human-readable error message"
}
```

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, invalid input |
| 401 | Unauthorized | Missing or invalid JWT token |
| 404 | Not Found | Resource doesn't exist or user doesn't own it |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Database connection failure |

## Data Validation Rules

### User Registration

- **email**: Required, valid email format, unique, max 255 characters
- **password**: Required, min 8 characters, must contain at least 1 number, max 128 characters

### Todo Creation/Update

- **title**: Required for creation, 1-200 characters, trimmed whitespace
- **notes**: Optional, max 1000 characters, can be empty string or null
- **due_date**: Optional, ISO 8601 date format (YYYY-MM-DD), can be null
- **completed**: Read-only for creation, boolean, defaults to false

### JWT Token

- **sub**: User ID (UUID format)
- **email**: User email (for logging/debugging)
- **exp**: Expiration timestamp (Unix epoch seconds)
- **Algorithm**: HS256
- **Secret**: Shared BETTER_AUTH_SECRET environment variable

## Security Requirements

### Authentication

- JWT tokens must be signed with strong secret (min 32 characters)
- Token expiration must be enforced (60 minutes)
- Invalid tokens must be rejected with 401 response
- Token validation must happen before any business logic

### Password Security

- Passwords must be hashed with bcrypt (cost factor 12)
- Plain text passwords must never be logged or stored
- Password validation errors must not reveal which check failed

### User Isolation

- All database queries must filter by user_id
- User_id must come from JWT token, never from request body
- 404 responses for non-owned resources (not 403, to avoid enumeration)

### Input Validation

- All input must be validated and sanitized
- SQL injection prevention via parameterized queries
- XSS prevention via proper content-type headers
- Max length enforcement on all string fields

## Performance Requirements

- **Latency**: p95 < 200ms for all endpoints
- **Throughput**: Support 100 concurrent users
- **Database**: Connection pooling enabled (min 5, max 20 connections)
- **Startup**: Application must start in under 10 seconds

## Observability

### Logging

- All requests logged with method, path, status code, duration
- All errors logged with stack trace and context
- No sensitive data (passwords, tokens) in logs

### Health Checks

- GET /health endpoint returns database connectivity status
- GET / endpoint returns API name and version
