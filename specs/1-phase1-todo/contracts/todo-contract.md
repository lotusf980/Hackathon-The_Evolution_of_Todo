# API Contracts: Phase 1 - Todo In-Memory Python Console App

## Task Operations Contract

### Operation: Add Task
**Method**: CREATE (Conceptual - for console app, this maps to user input)
**Input**:
- title: string (required, 1-200 characters)
- description: string (optional, 0-1000 characters)

**Output**:
- success: boolean
- task_id: integer (auto-generated)
- message: string (confirmation message)

**Error Conditions**:
- Title exceeds 200 characters
- Title is empty

**Example**:
```
Input: {title: "Buy groceries", description: "Milk, eggs, bread"}
Output: {success: true, task_id: 1, message: "Task added successfully"}
```

### Operation: List Tasks
**Method**: READ (Conceptual)
**Input**: None

**Output**:
- tasks: array of Task objects
- count: integer (total number of tasks)

**Example**:
```
Output: {
  tasks: [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      completed: false,
      created_at: "2026-02-04T10:00:00Z"
    }
  ],
  count: 1
}
```

### Operation: Get Task
**Method**: READ (Conceptual)
**Input**:
- task_id: integer (required)

**Output**:
- task: Task object or null
- found: boolean

**Error Conditions**:
- Task with ID does not exist

**Example**:
```
Input: {task_id: 1}
Output: {found: true, task: {id: 1, title: "Buy groceries", ...}}
```

### Operation: Update Task
**Method**: UPDATE (Conceptual)
**Input**:
- task_id: integer (required)
- title: string (optional, 1-200 characters)
- description: string (optional, 0-1000 characters)

**Output**:
- success: boolean
- message: string (confirmation message)

**Error Conditions**:
- Task with ID does not exist
- Title exceeds 200 characters

**Example**:
```
Input: {task_id: 1, title: "Buy groceries and fruits"}
Output: {success: true, message: "Task updated successfully"}
```

### Operation: Delete Task
**Method**: DELETE (Conceptual)
**Input**:
- task_id: integer (required)

**Output**:
- success: boolean
- message: string (confirmation message)

**Error Conditions**:
- Task with ID does not exist

**Example**:
```
Input: {task_id: 1}
Output: {success: true, message: "Task deleted successfully"}
```

### Operation: Toggle Task Completion
**Method**: UPDATE (Conceptual)
**Input**:
- task_id: integer (required)

**Output**:
- success: boolean
- completed: boolean (new completion status)
- message: string (confirmation message)

**Error Conditions**:
- Task with ID does not exist

**Example**:
```
Input: {task_id: 1}
Output: {success: true, completed: true, message: "Task marked as complete"}
```

## Task Object Schema

```json
{
  "id": {
    "type": "integer",
    "description": "Unique identifier for the task",
    "required": true
  },
  "title": {
    "type": "string",
    "description": "Title of the task (1-200 characters)",
    "required": true
  },
  "description": {
    "type": "string",
    "description": "Optional description of the task (0-1000 characters)",
    "required": false
  },
  "completed": {
    "type": "boolean",
    "description": "Completion status of the task",
    "required": true,
    "default": false
  },
  "created_at": {
    "type": "string",
    "format": "date-time",
    "description": "Timestamp when the task was created",
    "required": true
  }
}
```

## Error Response Schema

```json
{
  "success": {
    "type": "boolean",
    "value": false
  },
  "error": {
    "type": "string",
    "description": "Human-readable error message"
  },
  "code": {
    "type": "string",
    "description": "Machine-readable error code"
  }
}
```