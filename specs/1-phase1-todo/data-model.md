# Data Model: Phase 1 - Todo In-Memory Python Console App

## Task Entity

### Attributes
- **id**: Integer (Primary identifier, auto-incremented)
  - Generated when task is created
  - Unique within the application session
  - Immutable after creation

- **title**: String (Required, 1-200 characters)
  - User-defined name for the task
  - Required field during creation
  - Validated for length constraints

- **description**: String (Optional, 0-1000 characters)
  - Detailed information about the task
  - Optional field during creation/update
  - May be empty or null

- **completed**: Boolean (Default: False)
  - Indicates completion status of the task
  - False by default when created
  - Toggled between True/False via completion operations

- **created_at**: DateTime (Auto-generated)
  - Timestamp of when the task was created
  - Automatically set when task is instantiated
  - Immutable after creation

### Relationships
- None (standalone entity for Phase 1)

### Validation Rules
- Title must be 1-200 characters (inclusive)
- Description must be 0-1000 characters (inclusive)
- ID must be unique within the application session
- Creation timestamp must be set automatically
- Completion status must be boolean (True/False)

### State Transitions
- **Creation**: New task with completed=False, auto-generated ID and timestamp
- **Update**: Modify title and/or description while preserving ID and timestamps
- **Toggle Completion**: Switch completed status between True and False
- **Deletion**: Remove task from in-memory storage

### Methods
- **to_dict()**: Convert task to dictionary representation
- **from_dict()**: Create task instance from dictionary
- **validate()**: Check if task attributes meet validation rules
- **toggle_completion()**: Flip the completed status

## In-Memory Storage Structure

### Task Store
- **Data Type**: Dictionary with integer keys (task IDs) and Task object values
- **Thread Safety**: Not required for single-user console application
- **Initialization**: Empty dictionary at application start
- **Persistence**: None (data lost on application termination)

### ID Generation
- **Strategy**: Auto-incrementing integer starting from 1
- **Collision Prevention**: Check existing IDs before assignment
- **Reset Policy**: IDs persist within application session (not reset after deletions)