# Tasks: Frontend UI for The Evolution of Todo - Phase II

**Input**: Design documents from `/specs/1-frontend-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification or if user requests TDD approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/tests/`
- Paths shown assume frontend structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create frontend directory structure per plan.md (frontend/, frontend/src/, frontend/public/)
- [ ] T002 [P] Initialize Next.js 16+ project with TypeScript in frontend/ directory
- [ ] T003 [P] Install core dependencies: React 19+, Next.js 16+, Tailwind CSS 3.x
- [ ] T004 [P] Install Better Auth package for JWT authentication
- [ ] T005 [P] Install Framer Motion for complex animations
- [ ] T006 [P] Install testing dependencies: Vitest, React Testing Library, Playwright
- [ ] T007 [P] Configure TypeScript (tsconfig.json with strict mode enabled)
- [ ] T008 [P] Configure Tailwind CSS (tailwind.config.ts with custom theme)
- [ ] T009 [P] Configure ESLint + Prettier for code quality
- [ ] T010 [P] Create .env.local.example with NEXT_PUBLIC_API_URL and BETTER_AUTH_SECRET
- [ ] T011 [P] Create global styles (frontend/src/styles/globals.css with Tailwind directives)
- [ ] T012 [P] Create root layout (frontend/src/app/layout.tsx with providers)
- [ ] T013 [P] Create site configuration (frontend/src/config/site.ts)
- [ ] T014 [P] Create class name utility (frontend/src/lib/utils/cn.ts)
- [ ] T015 [P] Create date formatting utility (frontend/src/lib/utils/formatDate.ts)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T016 [P] Create TypeScript types for Todo entity (frontend/src/types/todo.ts)
- [ ] T017 [P] Create TypeScript types for User and Auth (frontend/src/types/auth.ts)
- [ ] T018 [P] Create TypeScript types for API responses (frontend/src/types/api.ts)
- [ ] T019 [P] Implement API client base class with JWT handling (frontend/src/lib/api/client.ts)
- [ ] T020 [P] Implement Auth API module (frontend/src/lib/api/auth.ts)
- [ ] T021 [P] Implement Todos API module (frontend/src/lib/api/todos.ts)
- [ ] T022 [P] Create useAuth custom hook (frontend/src/lib/hooks/useAuth.ts)
- [ ] T023 [P] Create useToast custom hook for notifications (frontend/src/lib/hooks/useToast.ts)
- [ ] T024 [P] Create ToastContext provider (frontend/src/components/ui/Toast.tsx)
- [ ] T025 [P] Create Button component with variants (frontend/src/components/ui/Button.tsx)
- [ ] T026 [P] Create Input component with validation states (frontend/src/components/ui/Input.tsx)
- [ ] T027 [P] create Spinner component for loading states (frontend/src/components/ui/Spinner.tsx)
- [ ] T028 [P] Create Skeleton component for loading states (frontend/src/components/ui/Skeleton.tsx)
- [ ] T029 [P] Create Modal component with portal and backdrop blur (frontend/src/components/ui/Modal.tsx)
- [ ] T030 [P] Create AuthGuard HOC for protected routes (frontend/src/components/auth/AuthGuard.tsx)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Registration and Authentication (Priority: P1) 🎯 MVP

**Goal**: Implement complete authentication flow (register, sign in, sign out, session persistence)

**Independent Test**: User can register with email/password, sign in successfully, be redirected to dashboard, and session persists across page refreshes.

### Implementation for User Story 1

- [ ] T031 [P] [US1] Create SignInForm component (frontend/src/components/auth/SignInForm.tsx)
- [ ] T032 [P] [US1] Create SignUpForm component with password confirmation (frontend/src/components/auth/SignUpForm.tsx)
- [ ] T033 [US1] Create sign-in page (frontend/src/app/(auth)/sign-in/page.tsx)
- [ ] T034 [US1] Create sign-up page (frontend/src/app/(auth)/sign-up/page.tsx)
- [ ] T035 [US1] Create auth pages layout (frontend/src/app/(auth)/layout.tsx)
- [ ] T036 [US1] Implement useTodos hook for data fetching (frontend/src/lib/hooks/useTodos.ts)
- [ ] T037 [US1] Create landing page for unauthenticated users (frontend/src/app/page.tsx)
- [ ] T038 [US1] Create Header component with UserMenu and SignOut (frontend/src/components/layout/Header.tsx)
- [ ] T039 [US1] Create UserMenu component (frontend/src/components/layout/UserMenu.tsx)
- [ ] T040 [US1] Create protected dashboard layout with AuthGuard (frontend/src/app/(dashboard)/layout.tsx)
- [ ] T041 [US1] Create empty dashboard page (frontend/src/app/(dashboard)/page.tsx - placeholder)
- [ ] T042 [US1] Add form validation for email format and password strength (frontend/src/lib/utils/validation.ts)
- [ ] T043 [US1] Implement session persistence across page refreshes (localStorage/cookie handling)
- [ ] T044 [US1] Add error handling for invalid credentials (toast notifications)
- [ ] T045 [US1] Implement automatic redirect to dashboard after successful auth

**Checkpoint**: At this point, User Story 1 should be fully functional - users can register, sign in, and see protected dashboard

---

## Phase 4: User Story 2 - Create New Todo (Priority: P1) 🎯 MVP

**Goal**: Implement modal form to create todos with title (required), notes (optional), due date (optional)

**Independent Test**: User can open add modal, enter valid title, submit, and see new todo appear instantly in list with success notification.

### Implementation for User Story 2

- [ ] T046 [P] [US2] Create TodoForm component for add/edit modals (frontend/src/components/todo/TodoForm.tsx)
- [ ] T047 [P] [US2] Add title input with required validation
- [ ] T048 [P] [US2] Add notes textarea (optional, max 1000 chars)
- [ ] T049 [P] [US2] Add due date picker (optional, date input)
- [ ] T050 [US2] Create Add Todo button component (frontend/src/components/todo/AddTodoButton.tsx)
- [ ] T051 [US2] Implement modal open/close state management
- [ ] T052 [US2] Add optimistic UI update for instant feedback
- [ ] T053 [US2] Show success toast when todo created
- [ ] T054 [US2] Handle API errors with rollback and error toast
- [ ] T055 [US2] Implement escape key and backdrop click to close modal
- [ ] T056 [US2] Add dirty form detection (confirm discard on unsaved changes)
- [ ] T057 [US2] Update dashboard page to fetch and display todos (frontend/src/app/(dashboard)/page.tsx)

**Checkpoint**: At this point, User Story 2 should be fully functional - users can create todos and see them appear in list

---

## Phase 5: User Story 3 - View and Manage Todo List (Priority: P1) 🎯 MVP

**Goal**: Implement beautiful, organized todo list with clear visual hierarchy, empty state, and loading states

**Independent Test**: User sees well-organized list of todos with title, notes preview, due date, completion status, and action buttons. Empty state is friendly and actionable.

### Implementation for User Story 3

- [ ] T058 [P] [US3] Create TodoItem component (frontend/src/components/todo/TodoItem.tsx)
- [ ] T059 [P] [US3] Add checkbox for completion toggle (visual only, logic in US4)
- [ ] T060 [P] [US3] Add title display with strikethrough for completed
- [ ] T061 [P] [US3] Add notes preview (collapsed, expand on hover/tap)
- [ ] T062 [P] [US3] Add due date display with color coding (green/yellow/red)
- [ ] T063 [P] [US3] Add Edit and Delete action buttons
- [ ] T064 [US3] Create TodoList component (frontend/src/components/todo/TodoList.tsx)
- [ ] T065 [US3] Create EmptyState component with illustration (frontend/src/components/todo/EmptyState.tsx)
- [ ] T066 [US3] Create loading skeleton for todo list (frontend/src/components/todo/TodoListSkeleton.tsx)
- [ ] T067 [US3] Implement sorting by creation date (newest first)
- [ ] T068 [US3] Add visual distinction between active and completed todos
- [ ] T069 [US3] Implement responsive list layout (mobile/tablet/desktop)
- [ ] T070 [US3] Add hover states and transitions for interactivity
- [ ] T071 [US3] Update dashboard to integrate TodoList with useTodos hook

**Checkpoint**: At this point, User Story 3 should be fully functional - users see their todos in organized list with empty state and loading states

---

## Phase 6: User Story 4 - Mark Todo Complete/Active (Priority: P2)

**Goal**: Implement completion toggle with instant visual feedback and optimistic updates

**Independent Test**: User can click checkbox to toggle completion with instant visual feedback (strikethrough, dimmed, animation). Change persists after refresh.

### Implementation for User Story 4

- [ ] T072 [P] [US4] Add optimistic update to handleComplete in useTodos hook
- [ ] T073 [P] [US4] Implement rollback on API error
- [ ] T074 [US4] Add strikethrough and dimmed styling for completed todos
- [ ] T075 [US4] Add success toast notification on toggle
- [ ] T076 [US4] Add subtle animation on status change (framer-motion)
- [ ] T077 [US4] Implement checkbox with custom SVG checkmark animation
- [ ] T078 [US4] Add error handling with user-friendly messages
- [ ] T079 [US4] Verify completion status persists after page refresh

**Checkpoint**: At this point, User Story 4 should be fully functional - users can toggle completion with instant feedback

---

## Phase 7: User Story 5 - Edit Todo (Priority: P2)

**Goal**: Implement edit modal pre-populated with current todo values

**Independent Test**: User can open any todo in edit modal, modify any field, save changes, and see updates reflected instantly in list.

### Implementation for User Story 5

- [ ] T080 [P] [US5] Add edit button to TodoItem component (frontend/src/components/todo/TodoItem.tsx)
- [ ] T081 [P] [US5] Create Edit Todo modal wrapper (reuse TodoForm)
- [ ] T082 [US5] Implement pre-population of form with current values
- [ ] T083 [US5] Add optimistic update for edit operation
- [ ] T084 [US5] Implement rollback on API error
- [ ] T085 [US5] Show success toast on successful update
- [ ] T086 [US5] Add dirty form detection (confirm discard on cancel)
- [ ] T087 [US5] Handle validation errors (title required)
- [ ] T088 [US5] Implement conflict detection for concurrent modifications (edge case)

**Checkpoint**: At this point, User Story 5 should be fully functional - users can edit todos with instant updates

---

## Phase 8: User Story 6 - Delete Todo (Priority: P2)

**Goal**: Implement delete with confirmation dialog and smooth animation

**Independent Test**: User can delete todo with confirmation. After deletion, todo is removed with smooth animation. Optional undo available for 5 seconds.

### Implementation for User Story 6

- [ ] T089 [P] [US6] Add delete button to TodoItem component (frontend/src/components/todo/TodoItem.tsx)
- [ ] T090 [P] [US6] Create DeleteConfirmation modal (frontend/src/components/todo/DeleteConfirmation.tsx)
- [ ] T091 [US6] Implement optimistic removal from list
- [ ] T092 [US6] Add rollback on API error
- [ ] T093 [US6] Show success toast with Undo option (5 second window)
- [ ] T094 [US6] Add fade-out animation on successful delete (framer-motion)
- [ ] T095 [US6] Implement undo functionality (restore from temporary state)
- [ ] T096 [US6] Add warning icon to confirmation dialog
- [ ] T097 [US6] Handle cancel action (close modal, no changes)

**Checkpoint**: At this point, User Story 6 should be fully functional - users can delete todos with confirmation and undo option

---

## Phase 9: User Story 7 - Responsive Experience (Priority: P3)

**Goal**: Ensure pixel-perfect responsiveness across mobile (320px+), tablet (768px+), and desktop (1920px+)

**Independent Test**: Application is fully functional and visually polished at all breakpoints. No horizontal scrolling. Touch targets minimum 44x44px.

### Implementation for User Story 7

- [ ] T098 [P] [US7] Add mobile-first responsive styles to all components (Tailwind breakpoints)
- [ ] T099 [P] [US7] Ensure touch targets minimum 44x44px on mobile
- [ ] T100 [P] [US7] Implement full-screen modals on mobile (< 640px)
- [ ] T101 [US7] Test and adjust spacing for mobile (comfortable thumb navigation)
- [ ] T102 [US7] Implement tablet-optimized layout (768-1024px)
- [ ] T103 [US7] Implement desktop layout with max-width container (1280px+)
- [ ] T104 [US7] Add hover states for desktop (hidden on mobile)
- [ ] T105 [US7] Test responsive breakpoints in Chrome DevTools
- [ ] T106 [US7] Test on real mobile device (iOS Safari, Android Chrome)
- [ ] T107 [US7] Verify no horizontal scrolling at any breakpoint
- [ ] T108 [US7] Test orientation change (portrait ↔ landscape)

**Checkpoint**: At this point, User Story 7 should be fully functional - app works beautifully on all devices

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, accessibility, performance optimization, and demo preparation

- [ ] T109 [P] Add micro-interactions (hover lifts, scale on click, focus rings)
- [ ] T110 [P] Implement keyboard navigation for all interactive elements
- [ ] T111 [P] Add ARIA labels to all icon buttons and interactive elements
- [ ] T112 [P] Verify color contrast ratios meet WCAG 2.1 AA (4.5:1 minimum)
- [ ] T113 [P] Add prefers-reduced-motion support (disable animations)
- [ ] T114 [P] Optimize bundle size (code splitting, lazy loading)
- [ ] T115 [P] Run Lighthouse audit and fix issues (target 90+ score)
- [ ] T116 [P] Add comprehensive error boundaries
- [ ] T117 [P] Create README.md with setup instructions and design philosophy
- [ ] T118 [P] Create IMPLEMENTATION_LOG.md documenting beauty decisions
- [ ] T119 [P] Add sample seed data for demo (2 users, 3 todos each)
- [ ] T120 [P] Final visual review and pixel-perfect adjustments
- [ ] T121 [P] Test complete user flow end-to-end
- [ ] T122 [P] Prepare demo script for hackathon judges

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Auth)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1 - Create)**: Depends on US3 (View List) - need list to show created todos
- **User Story 3 (P1 - View List)**: Can start after Foundational - Core dashboard functionality
- **User Story 4 (P2 - Complete)**: Depends on US3 (View List) - need todos to toggle
- **User Story 5 (P2 - Edit)**: Depends on US3 (View List) - need todos to edit
- **User Story 6 (P2 - Delete)**: Depends on US3 (View List) - need todos to delete
- **User Story 7 (P3 - Responsive)**: Can run parallel to US4-US6, but best after all core features complete

### Within Each User Story

- Models/types before services (hooks)
- Hooks before components
- Core components before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T015)
- All Foundational tasks marked [P] can run in parallel (T016-T030)
- Once Foundational is done:
  - Developer A: User Story 1 (Auth)
  - Developer B: User Story 3 (View List) - can start once basic auth done
  - Developer C: User Story 2 (Create) - depends on US3 being partially complete
- All UI components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (Auth)

```bash
# Launch all auth components together:
Task: "T031 [P] [US1] Create SignInForm component"
Task: "T032 [P] [US1] Create SignUpForm component"
Task: "T038 [P] [US1] Create Header component with UserMenu"

# These can run in parallel - different files, no dependencies
```

---

## Parallel Example: User Story 3 (View List)

```bash
# Launch all TodoItem sub-components together:
Task: "T059 [P] [US3] Add checkbox for completion toggle"
Task: "T060 [P] [US3] Add title display with strikethrough"
Task: "T061 [P] [US3] Add notes preview"
Task: "T062 [P] [US3] Add due date display"
Task: "T063 [P] [US3] Add Edit and Delete action buttons"

# These can run in parallel - different files, no dependencies
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Auth)
4. Complete Phase 5: User Story 3 (View List)
5. Complete Phase 4: User Story 2 (Create)
6. **STOP and VALIDATE**: Test MVP flow (register → sign in → add todo → see todo)
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Auth) → Test independently → Deploy/Demo (MVP Foundation!)
3. Add User Story 3 (View List) → Test independently → Deploy/Demo (Can see todos!)
4. Add User Story 2 (Create) → Test independently → Deploy/Demo (Full CRUD!)
5. Add User Story 4 (Complete) → Test independently → Deploy/Demo
6. Add User Story 5 (Edit) → Test independently → Deploy/Demo
7. Add User Story 6 (Delete) → Test independently → Deploy/Demo (Complete!)
8. Add User Story 7 (Responsive) → Test on devices → Deploy/Demo (Polish!)
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Auth)
   - Developer B: User Story 3 (View List)
   - Developer C: User Story 2 (Create) - after US3 basic structure ready
3. After P1 stories complete:
   - Developer A: User Story 4 (Complete)
   - Developer B: User Story 5 (Edit)
   - Developer C: User Story 6 (Delete)
4. All developers: User Story 7 (Responsive) + Polish

---

## Task Summary

| Phase | User Story | Task Count | Priority |
|-------|-----------|------------|----------|
| Phase 1 | Setup | 15 | N/A |
| Phase 2 | Foundational | 15 | N/A |
| Phase 3 | US1: Auth | 15 | P1 (MVP) |
| Phase 4 | US2: Create | 12 | P1 (MVP) |
| Phase 5 | US3: View List | 14 | P1 (MVP) |
| Phase 6 | US4: Complete | 8 | P2 |
| Phase 7 | US5: Edit | 9 | P2 |
| Phase 8 | US6: Delete | 9 | P2 |
| Phase 9 | US7: Responsive | 11 | P3 |
| Phase 10 | Polish | 14 | N/A |
| **Total** | **All** | **122** | **All** |

**MVP Scope** (P1 stories only): Phases 1-5 = **71 tasks**

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are OPTIONAL - include only if explicitly requested or TDD approach desired

---

**Ready for Implementation**: All tasks are specific enough that an LLM agent can complete them without additional context. Each task includes exact file paths and clear acceptance criteria.

**Next Command**: `/sp.implement` to begin implementation in priority order (P1 → P2 → P3)
