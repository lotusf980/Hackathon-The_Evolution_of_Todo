# Feature Specification: Frontend UI for The Evolution of Todo - Phase II

**Feature Branch**: `1-frontend-ui`
**Created**: 2025-12-30
**Status**: Draft
**Input**: User description: Frontend for The Evolution of Todo - Phase II: Full-Stack Web Application

## User Scenarios & Testing

### User Story 1 - User Registration and Authentication (Priority: P1) 🎯 MVP

As a new user, I want to create an account and sign in securely so that I can access my personal todo list with confidence that my data is private and protected.

**Why this priority**: Authentication is the foundation of multi-user isolation. Without it, no other features can be securely accessed. This is the gateway to all todo functionality.

**Independent Test**: User can register with email/password, receive confirmation, sign in successfully, and be redirected to the dashboard. Session persists across page refreshes.

**Acceptance Scenarios**:

1. **Given** I am on the landing page, **When** I click "Sign Up", **Then** I see a registration form with email, password, and confirm password fields
2. **Given** I am on the registration form, **When** I enter valid credentials and submit, **Then** my account is created and I am automatically signed in and redirected to the dashboard
3. **Given** I have an account, **When** I enter correct credentials on the sign-in form, **Then** I am authenticated and redirected to my todo dashboard
4. **Given** I am signed in, **When** I refresh the page, **Then** I remain signed in and see my todos
5. **Given** I enter invalid credentials, **When** I attempt to sign in, **Then** I see a clear error message and remain on the sign-in page
6. **Given** I am signed in, **When** I click "Sign Out", **Then** my session is cleared and I am redirected to the landing/sign-in page

---

### User Story 2 - Create New Todo (Priority: P1) 🎯 MVP

As an authenticated user, I want to quickly add a new todo item with a title and optional details so that I can capture tasks I need to accomplish.

**Why this priority**: Creating todos is the core value proposition. This is the primary action users will perform repeatedly throughout their day.

**Independent Test**: User can open the add modal, enter a title (required) and optional notes/due date, submit, and see the new todo appear instantly in their list with visual confirmation.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I click "Add Todo" button, **Then** a modal opens with a form containing title (required), notes (optional), and due date (optional) fields
2. **Given** the add modal is open, **When** I enter a valid title and submit, **Then** the modal closes, I see a success notification, and the new todo appears at the top of my list
3. **Given** the add modal is open, **When** I try to submit without a title, **Then** I see a validation error highlighting the title field and the modal remains open
4. **Given** I am in the add modal, **When** I press Escape key or click outside the modal, **Then** the modal closes without saving
5. **Given** I have entered text in the form, **When** the modal closes unexpectedly, **Then** I am asked to confirm I want to discard changes (if form is dirty)

---

### User Story 3 - View and Manage Todo List (Priority: P1) 🎯 MVP

As an authenticated user, I want to see all my todos in a clean, organized list so that I can understand what I need to accomplish and take action.

**Why this priority**: The todo list is the central hub of the application. Users must be able to quickly scan, understand, and interact with their tasks.

**Independent Test**: User sees a well-organized list of their todos with clear visual hierarchy, showing title, notes preview, due date, completion status, and action buttons. Empty state is friendly and actionable.

**Acceptance Scenarios**:

1. **Given** I have todos, **When** I load the dashboard, **Then** I see all my todos sorted by creation date (newest first) with clear visual distinction between active and completed
2. **Given** I have no todos, **When** I load the dashboard, **Then** I see a friendly empty state with an illustration, encouraging message, and prominent "Add Your First Todo" button
3. **Given** the list is loading, **When** I refresh or navigate to dashboard, **Then** I see a skeleton loader showing the expected list structure
4. **Given** I have many todos, **When** I scroll, **Then** the list performs well without lag (virtual scrolling if 50+ items)
5. **Given** a todo has a due date, **When** the date is approaching or past, **Then** I see visual indicators (color coding: green=future, yellow=soon, red=overdue)

---

### User Story 4 - Mark Todo Complete/Active (Priority: P2)

As an authenticated user, I want to quickly toggle a todo's completion status so that I can track my progress and feel a sense of accomplishment.

**Why this priority**: Marking tasks complete provides psychological reward and helps users track progress. It's a frequent, satisfying interaction.

**Independent Test**: User can click a checkbox or button to toggle completion status with instant visual feedback (animation, strikethrough, color change). Change persists after refresh.

**Acceptance Scenarios**:

1. **Given** I have an active todo, **When** I click the completion checkbox, **Then** the todo visually updates immediately (strikethrough, dimmed), and I see a brief success animation
2. **Given** I have a completed todo, **When** I click the completion checkbox, **Then** the todo returns to active state with visual confirmation
3. **Given** I just marked a todo complete, **When** I refresh the page, **Then** the completion status is preserved
4. **Given** I am marking a todo complete, **When** the API call fails, **Then** I see an error notification and the todo reverts to its previous state

---

### User Story 5 - Edit Todo (Priority: P2)

As an authenticated user, I want to modify an existing todo's details so that I can keep my tasks accurate as my plans change.

**Why this priority**: Tasks evolve. Users need to update titles, add notes, or change due dates without deleting and recreating todos.

**Independent Test**: User can open any todo in edit modal, modify any field, save changes, and see updates reflected instantly in the list.

**Acceptance Scenarios**:

1. **Given** I have a todo, **When** I click the edit button, **Then** a modal opens pre-populated with the todo's current title, notes, and due date
2. **Given** the edit modal is open, **When** I modify fields and click save, **Then** changes are saved, the modal closes, and I see the updated todo in the list with success notification
3. **Given** the edit modal is open, **When** I clear the title and try to save, **Then** I see a validation error and cannot submit
4. **Given** I have made changes in the edit modal, **When** I click cancel, **Then** I am asked to confirm I want to discard changes (if form is dirty)
5. **Given** I am editing, **When** another user modifies the same todo (edge case), **When** I save, **Then** I see a conflict error and am asked to refresh

---

### User Story 6 - Delete Todo (Priority: P2)

As an authenticated user, I want to permanently remove todos I no longer need so that my list stays focused and uncluttered.

**Why this priority**: Deleting unwanted tasks reduces cognitive load and keeps the todo list relevant. Essential for list maintenance.

**Independent Test**: User can delete a todo with confirmation dialog. After deletion, todo is removed from list with smooth animation. Action is irreversible (with optional undo window).

**Acceptance Scenarios**:

1. **Given** I have a todo, **When** I click the delete button, **Then** a confirmation dialog appears asking "Are you sure you want to delete this todo?"
2. **Given** the confirmation dialog is open, **When** I click "Delete", **Then** the todo is removed with a fade-out animation and I see a brief success notification
3. **Given** the confirmation dialog is open, **When** I click "Cancel", **Then** the dialog closes and the todo remains unchanged
4. **Given** I just deleted a todo, **When** the deletion completes, **Then** I see an "Undo" option in the notification for 5 seconds
5. **Given** I deleted a todo, **When** I refresh the page, **Then** the todo is no longer present

---

### User Story 7 - Responsive Experience Across Devices (Priority: P3)

As a user accessing from different devices, I want the application to adapt beautifully to my screen size so that I can manage my tasks comfortably on mobile, tablet, or desktop.

**Why this priority**: Users expect seamless experiences across all devices. Mobile usage is critical for on-the-go task management.

**Independent Test**: Application is fully functional and visually polished at 320px (mobile), 768px (tablet), and 1920px (desktop). No horizontal scrolling. Touch targets are finger-friendly on mobile.

**Acceptance Scenarios**:

1. **Given** I am on a mobile device (320-640px), **When** I use the app, **Then** all features are accessible via touch-friendly buttons (min 44x44px), modals fill the screen, and navigation is thumb-optimized
2. **Given** I am on a tablet (768-1024px), **When** I use the app, **Then** the layout adapts with optimal use of space, modals are centered with backdrop, and list items have comfortable spacing
3. **Given** I am on a desktop (1280px+), **When** I use the app, **Then** the layout uses wider screen real estate elegantly, modals are appropriately sized, and hover states enhance interactivity
4. **Given** I rotate my device, **When** the orientation changes, **Then** the layout smoothly transitions without breaking or requiring refresh

---

### Edge Cases

- **Network failure during API call**: Show user-friendly error notification with "Retry" option; optimistic UI updates revert on failure
- **Session expires mid-session**: Detect on next API call, show "Session expired" notification, redirect to sign-in with return URL
- **Concurrent modifications**: Show conflict error if todo was modified by another device since load
- **Very long todo titles**: Truncate with ellipsis after 3 lines, show full title on hover/tap
- **XSS attempt in todo content**: Sanitize all user input before display
- **Slow network**: Show loading skeletons, disable buttons during submission, provide timeout feedback
- **Browser back button during modal**: Close modal cleanly without losing list state
- **Multiple rapid clicks on actions**: Debounce buttons to prevent duplicate submissions

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide user registration with email and password (min 8 characters, at least 1 number)
- **FR-002**: System MUST provide user sign-in with email/password authentication
- **FR-003**: System MUST maintain authenticated session across page refreshes using JWT stored securely
- **FR-004**: System MUST provide sign-out functionality that clears session and redirects to landing page
- **FR-005**: System MUST display a dashboard showing all user's todos upon successful authentication
- **FR-006**: System MUST provide a modal form to create new todos with title (required), notes (optional), and due date (optional)
- **FR-007**: System MUST display todos in a list sorted by creation date (newest first) with visual distinction between active and completed
- **FR-008**: System MUST provide a checkbox/button to toggle todo completion status with instant visual feedback
- **FR-009**: System MUST provide a modal form to edit existing todos, pre-populated with current values
- **FR-010**: System MUST provide delete functionality with confirmation dialog before permanent removal
- **FR-011**: System MUST show an empty state with illustration and call-to-action when user has no todos
- **FR-012**: System MUST show skeleton loaders while todos are being fetched
- **FR-013**: System MUST display success/error notifications for all user actions (create, update, delete, complete)
- **FR-014**: System MUST validate form inputs client-side before submission (title required, email format, password strength)
- **FR-015**: System MUST automatically attach JWT to all API requests when user is authenticated
- **FR-016**: System MUST redirect to sign-in page when API returns 401 (unauthorized)
- **FR-017**: System MUST be fully responsive across mobile (320px+), tablet (768px+), and desktop (1280px+)
- **FR-018**: System MUST provide keyboard navigation support for all interactive elements
- **FR-019**: System MUST show visual loading states during all async operations (button spinners, disabled states)
- **FR-020**: System MUST confirm before discarding unsaved changes in modals (dirty form detection)

### Key Entities

- **User**: Represents an authenticated user with email, password (hashed), and collection of todos
- **Todo**: Represents a task with title (required), notes (optional), due date (optional), completion status, creation timestamp, and last modified timestamp
- **Session**: Represents an authenticated user session with JWT token, expiry time, and user metadata

## Success Criteria

### Measurable Outcomes

- **SC-001**: New users can complete registration and create their first todo in under 2 minutes from landing page
- **SC-002**: All user-facing actions (create, edit, delete, complete) provide visual feedback within 100ms (optimistic updates)
- **SC-003**: Application achieves Lighthouse performance score of 90+ on mobile and desktop
- **SC-004**: All interactive elements meet WCAG 2.1 AA accessibility standards (keyboard navigation, screen reader support, color contrast 4.5:1 minimum)
- **SC-005**: Zero layout shifts (CLS < 0.1) during page load and interactions
- **SC-006**: 100% of users can successfully complete core tasks (add, complete, delete todos) without confusion on first use (usability testing)
- **SC-007**: Application loads initial dashboard content in under 2 seconds on 3G connection
- **SC-008**: All modals and forms are fully usable on mobile devices with touch targets minimum 44x44 pixels

## Assumptions

- Users have modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- Users have JavaScript enabled
- Backend API is available and follows RESTful conventions defined in constitution
- JWT tokens are valid for 1 hour and can be refreshed
- Email confirmation is not required for initial MVP (can be added in future phase)
- Single-device usage per session (no complex multi-device sync beyond API persistence)
- Users understand basic web conventions (forms, buttons, modals)

## Visual Design Requirements

### Design Principles

1. **Clarity**: Every element has a clear purpose. No decorative elements without function.
2. **Consistency**: Spacing, colors, typography follow a systematic scale (Tailwind default scale preferred).
3. **Depth**: Subtle shadows and layering create visual hierarchy without heavy skeuomorphism.
4. **Motion**: Micro-interactions are smooth (200-300ms), purposeful, and respect reduced-motion preferences.
5. **Whitespace**: Generous padding and margins create breathing room and focus attention.

### Color Palette (Tailwind CSS)

- **Primary**: `blue-600` (buttons, links, active states)
- **Primary Hover**: `blue-700`
- **Success**: `green-500` (completion, success notifications)
- **Danger**: `red-500` (delete actions, error states)
- **Warning**: `yellow-500` (due date approaching)
- **Neutral**: `gray-50` to `gray-900` (text, backgrounds, borders)
- **Background**: `gray-50` (app background), `white` (cards, modals)
- **Border**: `gray-200` (subtle dividers, input borders)

### Typography

- **Font Family**: Inter (primary), system-ui fallback
- **Heading Scale**:
  - H1: `text-3xl font-bold` (page titles)
  - H2: `text-2xl font-semibold` (section headers)
  - H3: `text-xl font-semibold` (modal titles)
- **Body Text**: `text-base text-gray-700` (primary content)
- **Small Text**: `text-sm text-gray-500` (metadata, hints)

### Spacing System

- Use Tailwind's default spacing scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
- Consistent padding: `p-4` (16px) for cards, `p-6` (24px) for modals
- Gap between list items: `divide-y divide-gray-200`

### Component Specifications

#### Buttons

- **Primary**: `bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors`
- **Secondary**: `bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors`
- **Danger**: `bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-lg transition-colors`
- **Disabled**: `bg-gray-200 text-gray-400 cursor-not-allowed`
- **Loading**: Spinner icon, disabled state, maintain width

#### Input Fields

- **Base**: `w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow`
- **Error State**: `border-red-500 focus:ring-red-500`
- **Label**: `block text-sm font-medium text-gray-700 mb-1`
- **Error Message**: `text-sm text-red-600 mt-1`

#### Modals

- **Backdrop**: `fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity`
- **Container**: `fixed inset-0 flex items-center justify-center p-4 z-50`
- **Content**: `bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto`
- **Header**: `px-6 py-4 border-b border-gray-200 flex justify-between items-center`
- **Body**: `px-6 py-4`
- **Footer**: `px-6 py-4 border-t border-gray-200 flex justify-end gap-3`

#### Todo Item

- **Container**: `flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow`
- **Checkbox**: `w-5 h-5 text-blue-600 rounded focus:ring-blue-500`
- **Title**: `flex-1 font-medium text-gray-900` (strikethrough when complete: `line-through text-gray-500`)
- **Due Date**: `text-sm text-gray-500` (overdue: `text-red-600 font-medium`)
- **Actions**: `flex gap-2` (edit/delete buttons with icon-only on mobile)

#### Notifications (Toast)

- **Success**: `bg-green-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded shadow-lg`
- **Error**: `bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded shadow-lg`
- **Position**: Fixed bottom-right on desktop, bottom-center on mobile
- **Animation**: Slide in from right (desktop) / bottom (mobile), auto-dismiss after 5 seconds

### Textual Wireframes

#### Landing Page (Unauthenticated)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    [Logo/Brand]                         │
│                                                         │
│              Manage Your Tasks Effortlessly             │
│                                                         │
│         A beautiful, simple way to stay organized       │
│                                                         │
│              [Sign In]        [Sign Up]                 │
│                                                         │
│                                                         │
│              Features:                                  │
│              ✓ Quick task capture                       │
│              ✓ Never lose your tasks                    │
│              ✓ Access from anywhere                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Sign In / Sign Up Page

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    [Logo/Brand]                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │  Welcome Back                                     │ │
│  │  Sign in to your account                          │ │
│  │                                                   │ │
│  │  Email *                                          │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ you@example.com                             │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  Password *                                       │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ ••••••••••••••                              │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │           [Sign In]                               │ │
│  │                                                   │ │
│  │  Don't have an account? [Sign Up]                 │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Dashboard (Todo List)

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                              [User] [Sign Out] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  My Tasks                                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  + Add Todo                                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ☐ Complete project proposal           [Edit][×] │   │
│  │   Due: Tomorrow                                  │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ ☑ Schedule team meeting               [Edit][×] │   │
│  │   Due: Yesterday                                 │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ ☐ Buy groceries                        [Edit][×] │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Empty State

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                              [User] [Sign Out] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  My Tasks                                               │
│                                                         │
│              ┌─────────────────────┐                   │
│              │                     │                   │
│              │   [Illustration]    │                   │
│              │                     │                   │
│              └─────────────────────┘                   │
│                                                         │
│           You're all caught up!                         │
│                                                         │
│     No tasks yet. Add one to get started.               │
│                                                         │
│              [+ Add Your First Todo]                    │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Add/Edit Modal

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │  Add New Todo                              [×]    │ │
│  │                                                   │ │
│  ├───────────────────────────────────────────────────┤ │
│  │                                                   │ │
│  │  Title *                                          │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ Complete project documentation              │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  Notes                                            │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ Include API docs and usage examples...      │ │ │
│  │  │                                             │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  Due Date                                         │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ 📅 2025-12-31                               │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │                                                   │ │
│  │                      [Cancel]    [Save Todo]      │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Delete Confirmation Dialog

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │           ⚠️ Delete Todo?                         │ │
│  │                                                   │ │
│  │  Are you sure you want to delete                  │ │
│  │  "Complete project documentation"?                │ │
│  │  This action cannot be undone.                    │ │
│  │                                                   │ │
│  │                                                   │ │
│  │            [Cancel]      [Delete]                 │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── AuthGuard (HOC for protected routes)
│   └── Dashboard (protected)
│       ├── Header
│       │   ├── Logo
│       │   ├── UserMenu
│       │   └── SignOutButton
│       ├── TodoList
│       │   ├── EmptyState
│       │   ├── SkeletonList
│       │   └── TodoItem (multiple)
│       │       ├── Checkbox
│       │       ├── TodoContent
│       │       │   ├── Title
│       │       │   ├── Notes (collapsed)
│       │       │   └── DueDate
│       │       └── ActionButtons
│       │           ├── EditButton
│       │           └── DeleteButton
│       └── AddTodoButton
│
├── AuthPages
│   ├── SignInPage
│   │   └── SignInForm
│   │       ├── EmailInput
│   │       ├── PasswordInput
│   │       └── SubmitButton
│   └── SignUpPage
│       └── SignUpForm
│           ├── EmailInput
│           ├── PasswordInput
│           ├── ConfirmPasswordInput
│           └── SubmitButton
│
├── Modals
│   ├── TodoModal (Add/Edit)
│   │   ├── ModalHeader
│   │   ├── TodoForm
│   │   │   ├── TitleInput
│   │   │   ├── NotesTextarea
│   │   │   └── DueDatePicker
│   │   └── ModalFooter
│   │       ├── CancelButton
│   │       └── SaveButton
│   └── DeleteConfirmationModal
│       ├── WarningIcon
│       ├── Message
│       └── ActionButtons
│           ├── CancelButton
│           └── DeleteButton
│
└── Shared
    ├── Button
    ├── Input
    ├── Modal
    ├── Toast (Notification)
    ├── Spinner
    └── Skeleton
```

## API Client Specification

### Requirements

- **Typed**: Full TypeScript types for all requests/responses
- **Automatic JWT**: Attach token from secure storage to all requests
- **Error Handling**: Unified error type with status codes and messages
- **Auth Redirect**: Automatically redirect to sign-in on 401
- **Retry Logic**: Retry failed requests once (network errors only)
- **Timeout**: 10-second timeout on all requests

### API Endpoints (Frontend Consumption)

| Method | Endpoint | Request Body | Response | Purpose |
|--------|----------|--------------|----------|---------|
| POST | `/api/auth/register` | `{ email, password }` | `{ user, token }` | Register new user |
| POST | `/api/auth/login` | `{ email, password }` | `{ user, token }` | Sign in user |
| POST | `/api/todos` | `{ title, notes?, dueDate? }` | `{ todo }` | Create todo |
| GET | `/api/todos` | - | `{ todos: Todo[] }` | List all user's todos |
| GET | `/api/todos/:id` | - | `{ todo }` | Get single todo |
| PUT | `/api/todos/:id` | `{ title, notes?, dueDate?, completed }` | `{ todo }` | Update todo |
| PATCH | `/api/todos/:id/complete` | `{ completed: boolean }` | `{ todo }` | Toggle completion |
| DELETE | `/api/todos/:id` | - | `{ success: true }` | Delete todo |

### Client Usage Example

```typescript
// api/client.ts
const apiClient = {
  auth: {
    register: (data: RegisterInput) => post<RegisterResponse>('/auth/register', data),
    login: (data: LoginInput) => post<LoginResponse>('/auth/login', data),
  },
  todos: {
    list: () => get<TodosResponse>('/todos'),
    create: (data: CreateTodoInput) => post<TodoResponse>('/todos', data),
    update: (id: string, data: UpdateTodoInput) => put<TodoResponse>(`/todos/${id}`, data),
    delete: (id: string) => del<DeleteResponse>(`/todos/${id}`),
    toggleComplete: (id: string, completed: boolean) => patch<TodoResponse>(`/todos/${id}/complete`, { completed }),
  },
};
```

## Responsive Breakpoints

| Breakpoint | Min Width | Layout Changes |
|------------|-----------|----------------|
| Mobile | 320px | Full-width modals, stacked buttons, icon-only actions, condensed header |
| Mobile Large | 640px | Two-column action buttons, full modal width with padding |
| Tablet | 768px | Centered modals (max-width 512px), grid layout for todos (2 columns if space) |
| Desktop | 1024px | Standard modal size, single-column todo list, full header with user menu |
| Desktop Large | 1280px | Max-width content container (1024px), increased whitespace |

## Accessibility Requirements

- **Keyboard Navigation**: All interactive elements reachable via Tab key
- **Focus Indicators**: Visible focus rings on all buttons, inputs, links (`focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`)
- **Screen Reader Support**: ARIA labels on icon buttons, semantic HTML, live regions for notifications
- **Color Contrast**: All text meets 4.5:1 contrast ratio (gray-700 on white minimum)
- **Reduced Motion**: Respect `prefers-reduced-motion` media query (disable animations)
- **Form Labels**: All inputs have visible labels (not placeholders only)
- **Error Announcements**: Form errors announced to screen readers (`aria-live="polite"`)

## Performance Requirements

- **Initial Load**: Dashboard renders skeleton within 1 second
- **Time to Interactive**: Under 3 seconds on 3G
- **Bundle Size**: Under 200KB gzipped (excluding images)
- **Image Optimization**: All images in WebP format with fallbacks
- **Code Splitting**: Auth pages and dashboard split into separate chunks
- **Lazy Loading**: Non-critical components (modals) lazy-loaded
- **Memoization**: React.memo on list items to prevent unnecessary re-renders
