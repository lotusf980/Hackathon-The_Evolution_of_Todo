# API Contracts: Phase 2 - Todo Full-Stack Web Application

## Authentication API

### POST /api/auth/register
Register a new user account.

**Headers**:
- Content-Type: application/json

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securePassword123"
}
```

**Response Codes**:
- 201: User created successfully
- 400: Invalid input data
- 409: Email already exists

**Success Response (201)**:
```json
{
  "id": "user-uuid-string",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2026-02-04T10:00:00Z"
}
```

### POST /api/auth/login
Authenticate user and return JWT token.

**Headers**:
- Content-Type: application/json

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response Codes**:
- 200: Login successful
- 401: Invalid credentials

**Success Response (200)**:
```json
{
  "access_token": "jwt-token-string",
  "token_type": "bearer",
  "user": {
    "id": "user-uuid-string",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /api/auth/logout
Logout user and invalidate session.

**Headers**:
- Authorization: Bearer {access_token}

**Response Codes**:
- 200: Logout successful
- 401: Invalid or expired token

**Success Response (200)**:
```json
{
  "message": "Successfully logged out"
}
```

## Tasks API

### GET /api/{user_id}/tasks
Retrieve all tasks for the authenticated user.

**Path Parameters**:
- user_id: The ID of the user whose tasks to retrieve

**Headers**:
- Authorization: Bearer {access_token}

**Query Parameters**:
- status: Filter by status ("all", "pending", "completed") - default: "all"
- sort: Sort by field ("created", "title", "due_date") - default: "created"

**Response Codes**:
- 200: Tasks retrieved successfully
- 401: Unauthorized (invalid token)
- 403: Forbidden (attempting to access another user's tasks)
- 404: User not found

**Success Response (200)**:
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": "user-uuid-string",
      "title": "Sample task",
      "description": "Task description",
      "completed": false,
      "created_at": "2026-02-04T10:00:00Z",
      "updated_at": "2026-02-04T10:00:00Z"
    }
  ],
  "count": 1
}
```

### POST /api/{user_id}/tasks
Create a new task for the authenticated user.

**Path Parameters**:
- user_id: The ID of the user creating the task

**Headers**:
- Content-Type: application/json
- Authorization: Bearer {access_token}

**Request Body**:
```json
{
  "title": "New task title",
  "description": "Task description (optional)"
}
```

**Validation**:
- title: Required, 1-200 characters
- description: Optional, 0-1000 characters

**Response Codes**:
- 201: Task created successfully
- 400: Validation error
- 401: Unauthorized (invalid token)
- 403: Forbidden (attempting to create task for another user)
- 404: User not found

**Success Response (201)**:
```json
{
  "id": 1,
  "user_id": "user-uuid-string",
  "title": "New task title",
  "description": "Task description (optional)",
  "completed": false,
  "created_at": "2026-02-04T10:00:00Z",
  "updated_at": "2026-02-04T10:00:00Z"
}
```

### GET /api/{user_id}/tasks/{id}
Retrieve a specific task for the authenticated user.

**Path Parameters**:
- user_id: The ID of the user whose task to retrieve
- id: The ID of the task to retrieve

**Headers**:
- Authorization: Bearer {access_token}

**Response Codes**:
- 200: Task retrieved successfully
- 401: Unauthorized (invalid token)
- 403: Forbidden (attempting to access another user's task)
- 404: Task or user not found

**Success Response (200)**:
```json
{
  "id": 1,
  "user_id": "user-uuid-string",
  "title": "Sample task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-02-04T10:00:00Z",
  "updated_at": "2026-02-04T10:00:00Z"
}
```

### PUT /api/{user_id}/tasks/{id}
Update a specific task for the authenticated user.

**Path Parameters**:
- user_id: The ID of the user whose task to update
- id: The ID of the task to update

**Headers**:
- Content-Type: application/json
- Authorization: Bearer {access_token}

**Request Body**:
```json
{
  "title": "Updated task title (optional)",
  "description": "Updated task description (optional)"
}
```

**Response Codes**:
- 200: Task updated successfully
- 400: Validation error
- 401: Unauthorized (invalid token)
- 403: Forbidden (attempting to update another user's task)
- 404: Task or user not found

**Success Response (200)**:
```json
{
  "id": 1,
  "user_id": "user-uuid-string",
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": false,
  "created_at": "2026-02-04T10:00:00Z",
  "updated_at": "2026-02-04T11:00:00Z"
}
```

### DELETE /api/{user_id}/tasks/{id}
Delete a specific task for the authenticated user.

**Path Parameters**:
- user_id: The ID of the user whose task to delete
- id: The ID of the task to delete

**Headers**:
- Authorization: Bearer {access_token}

**Response Codes**:
- 200: Task deleted successfully
- 401: Unauthorized (invalid token)
- 403: Forbidden (attempting to delete another user's task)
- 404: Task or user not found

**Success Response (200)**:
```json
{
  "message": "Task deleted successfully",
  "deleted_task_id": 1
}
```

### PATCH /api/{user_id}/tasks/{id}/complete
Toggle the completion status of a specific task for the authenticated user.

**Path Parameters**:
- user_id: The ID of the user whose task to update
- id: The ID of the task to toggle

**Headers**:
- Authorization: Bearer {access_token}

**Response Codes**:
- 200: Task completion status updated successfully
- 401: Unauthorized (invalid token)
- 403: Forbidden (attempting to update another user's task)
- 404: Task or user not found

**Success Response (200)**:
```json
{
  "id": 1,
  "user_id": "user-uuid-string",
  "title": "Sample task",
  "description": "Task description",
  "completed": true,
  "created_at": "2026-02-04T10:00:00Z",
  "updated_at": "2026-02-04T11:30:00Z"
}
```

## Error Response Schema

All error responses follow this schema:

```json
{
  "detail": "Human-readable error message"
}
```

## JWT Token Schema

JWT tokens contain the following claims:
- `sub`: User ID (subject)
- `exp`: Expiration timestamp
- `iat`: Issued at timestamp
- `jti`: JWT ID for potential revocation