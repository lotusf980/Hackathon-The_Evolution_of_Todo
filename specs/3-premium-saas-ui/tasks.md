# Tasks: Premium Animated SaaS UI for Todo Full-Stack Web App

**Input**: Design documents from `/specs/3-premium-saas-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification or if user requests TDD approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/components/`
- Paths shown assume frontend structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, install dependencies, configure ShadCN UI and Framer Motion

- [ ] T001 [P] Install Framer Motion: `npm install framer-motion`
- [ ] T002 [P] Install Lucide React icons: `npm install lucide-react`
- [ ] T003 [P] Initialize ShadCN UI: `npx shadcn-ui@latest init`
- [ ] T004 [P] Add ShadCN Button component: `npx shadcn-ui@latest add button`
- [ ] T005 [P] Add ShadCN Card component: `npx shadcn-ui@latest add card`
- [ ] T006 [P] Add ShadCN Input component: `npx shadcn-ui@latest add input`
- [ ] T007 [P] Add ShadCN Dialog component: `npx shadcn-ui@latest add dialog`
- [ ] T008 [P] Add ShadCN Dropdown Menu: `npx shadcn-ui@latest add dropdown-menu`
- [ ] T009 [P] Add ShadCN Sidebar: `npx shadcn-ui@latest add sidebar`
- [ ] T010 [P] Add ShadCN Skeleton: `npx shadcn-ui@latest add skeleton`
- [ ] T011 [P] Update tailwind.config.ts with animation variants (fade-in, slide-up, shimmer)
- [ ] T012 [P] Create src/styles/variables.css with CSS custom properties (design tokens)
- [ ] T013 [P] Update src/styles/globals.css to import variables.css
- [ ] T014 [P] Create src/config/design-tokens.ts with TypeScript design token definitions
- [ ] T015 [P] Create src/components/animations/motion-primitives.ts with Framer Motion variants

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout components and animation wrappers that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T016 [P] Create src/components/layout/AppSidebar.tsx with collapsible navigation
- [ ] T017 [P] Create src/components/layout/AppHeader.tsx with user menu placeholder
- [ ] T018 [P] Create src/components/layout/MobileDrawer.tsx with backdrop
- [ ] T019 [P] Create src/components/animations/PageTransition.tsx wrapper component
- [ ] T020 [P] Create src/components/animations/StaggerList.tsx for list animations
- [ ] T021 [P] Create src/components/animations/Skeleton.tsx with shimmer effect
- [ ] T022 [P] Create src/lib/hooks/useMediaQuery.ts for responsive breakpoints
- [ ] T023 [P] Update src/app/layout.tsx to include motion providers
- [ ] T024 [P] Update src/app/(dashboard)/layout.tsx to use AppSidebar and AppHeader
- [ ] T025 [P] Add responsive CSS breakpoints to globals.css (320px, 768px, 1024px, 1280px)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - SaaS Dashboard Navigation (Priority: P1) 🎯 MVP

**Goal**: Implement fixed sidebar navigation with smooth collapse/expand animation and mobile drawer

**Independent Test**: User can collapse/expand sidebar with smooth animation, access all main sections, and mobile drawer works smoothly.

### Implementation for User Story 1

- [ ] T026 [P] [US1] Add navigation items array to AppSidebar (Dashboard, Todos, Settings)
- [ ] T027 [P] [US1] Implement sidebar collapse/expand toggle button with animation
- [ ] T028 [US1] Add Framer Motion layout animation to AppSidebar collapse
- [ ] T029 [US1] Implement icon-only collapsed state for sidebar items
- [ ] T030 [US1] Add active state styling to current navigation item
- [ ] T031 [US1] Implement MobileDrawer hamburger menu button in AppHeader
- [ ] T032 [US1] Add backdrop fade animation to MobileDrawer
- [ ] T033 [US1] Implement close on outside click for MobileDrawer
- [ ] T034 [US1] Implement close on escape key press for MobileDrawer
- [ ] T035 [US1] Add smooth slide-in animation to MobileDrawer (from left)
- [ ] T036 [US1] Test sidebar on desktop (1024px+): collapse/expand smooth
- [ ] T037 [US1] Test mobile drawer (<768px): opens/closes smoothly

**Checkpoint**: At this point, User Story 1 should be fully functional - navigation works on all screen sizes

---

## Phase 4: User Story 2 - Premium Visual Design System (Priority: P1) 🎯 MVP

**Goal**: Apply consistent design tokens, glassmorphism effects, and premium styling to all components

**Independent Test**: All components follow design tokens. Glassmorphism visible on cards. All interactive elements have hover/focus states.

### Implementation for User Story 2

- [ ] T038 [P] [US2] Apply design tokens to all Button components (colors, spacing, radius)
- [ ] T039 [P] [US2] Apply design tokens to all Card components
- [ ] T040 [P] [US2] Apply design tokens to all Input components
- [ ] T041 [US2] Add glassmorphism effect to Card components (backdrop-blur, transparency)
- [ ] T042 [US2] Implement shadow depth system (sm, md, lg, xl) across components
- [ ] T043 [US2] Add hover state to all Button variants (scale 1.02-1.05)
- [ ] T044 [US2] Add focus ring animation to all Input components
- [ ] T045 [US2] Add hover lift effect to TodoItem cards (shadow increase)
- [ ] T046 [US2] Implement soft neutral color palette in variables.css
- [ ] T047 [US2] Add brand accent color (blue/indigo) to primary actions
- [ ] T048 [US2] Verify consistent spacing scale (4px grid) across all components
- [ ] T049 [US2] Test glassmorphism on cards: backdrop blur visible
- [ ] T050 [US2] Test hover states: all interactive elements respond

**Checkpoint**: At this point, User Story 2 should be fully functional - premium visual design applied throughout

---

## Phase 5: User Story 3 - Page Transition Animations (Priority: P2)

**Goal**: Implement smooth page transitions and skeleton loading states

**Independent Test**: All route changes have fade/slide animations. Loading states show skeleton with shimmer.

### Implementation for User Story 3

- [ ] T051 [P] [US3] Wrap all page components with PageTransition component
- [ ] T052 [P] [US3] Implement fade-out/fade-in animation (300ms) for route changes
- [ ] T053 [US3] Add subtle slide animation (10-20px) to page transitions
- [ ] T054 [US3] Create skeleton loaders for TodoList component
- [ ] T055 [US3] Create skeleton loaders for TodoItem components
- [ ] T056 [US3] Add shimmer animation to all skeleton loaders (1.5s loop)
- [ ] T057 [US3] Implement staggered content load animation (50ms delay between items)
- [ ] T058 [US3] Add slide-up animation to content on load
- [ ] T059 [US3] Test page transitions: smooth fade/slide on navigation
- [ ] T060 [US3] Test skeleton loaders: visible during data fetch with shimmer

**Checkpoint**: At this point, User Story 3 should be fully functional - smooth page transitions and loading states

---

## Phase 6: User Story 4 - Interactive Element Animations (Priority: P2)

**Goal**: Add micro-interactions to all interactive elements with smooth animations

**Independent Test**: All buttons, checkboxes, inputs, cards have hover/focus/active states. Animations smooth (200-300ms).

### Implementation for User Story 4

- [ ] T061 [P] [US4] Add hover scale animation to all TodoItem components
- [ ] T062 [P] [US4] Implement smooth checkmark draw animation for checkbox toggle
- [ ] T063 [US4] Add slide-in animation when new todo is added
- [ ] T064 [US4] Add fade-out + collapse animation when todo is deleted
- [ ] T065 [US4] Implement stagger animation for TodoList items (50-100ms delay)
- [ ] T066 [US4] Add tap scale animation (0.98) to all Button components
- [ ] T067 [US4] Add smooth color transition to Input on focus
- [ ] T068 [US4] Implement reduced motion support (check prefers-reduced-motion)
- [ ] T069 [US4] Disable all animations when reduced motion preferred
- [ ] T070 [US4] Test checkbox animation: smooth checkmark draw on toggle
- [ ] T071 [US4] Test todo add: slides in with fade animation
- [ ] T072 [US4] Test todo delete: fades out with collapse animation

**Checkpoint**: At this point, User Story 4 should be fully functional - all micro-interactions working

---

## Phase 7: User Story 5 - Responsive Mobile Experience (Priority: P1) 🎯 MVP

**Goal**: Ensure fully optimized, touch-friendly interface for mobile devices

**Independent Test**: All touch targets minimum 44x44px. Drawer navigation smooth. No horizontal scrolling.

### Implementation for User Story 5

- [ ] T073 [P] [US5] Ensure all touch targets minimum 44x44px (buttons, inputs, checkboxes)
- [ ] T074 [P] [US5] Implement touch-friendly spacing for mobile list items
- [ ] T075 [US5] Test MobileDrawer on 320px width: fully functional
- [ ] T076 [US5] Test MobileDrawer on 767px width: smooth operation
- [ ] T077 [US5] Ensure no horizontal scrolling at any breakpoint
- [ ] T078 [US5] Test smooth scrolling for todo list on mobile
- [ ] T079 [US5] Implement orientation change handling (portrait ↔ landscape)
- [ ] T080 [US5] Test layout adaptation on orientation change
- [ ] T081 [US5] Add touch-friendly hover states (work on tap for mobile)
- [ ] T082 [US5] Verify no stuck hover states on touch devices
- [ ] T083 [US5] Test on real mobile device (iOS Safari, Android Chrome)
- [ ] T084 [US5] Test touch targets: all minimum 44x44px

**Checkpoint**: At this point, User Story 5 should be fully functional - mobile experience optimized

---

## Phase 8: User Story 6 - User Profile & Settings (Priority: P2)

**Goal**: Implement animated user profile dropdown with sign-out functionality

**Independent Test**: Profile dropdown opens/closes with smooth animation. Shows user avatar, email, sign-out. Closes on outside click.

### Implementation for User Story 6

- [ ] T085 [P] [US6] Create src/components/layout/ProfileDropdown.tsx component
- [ ] T086 [P] [US6] Add user avatar display (initial letter in circle)
- [ ] T087 [US6] Add user email display in dropdown
- [ ] T088 [US6] Add sign-out button with confirmation
- [ ] T089 [US6] Implement scale + fade animation for dropdown open/close
- [ ] T090 [US6] Add backdrop blur to dropdown menu
- [ ] T091 [US6] Implement close on outside click
- [ ] T092 [US6] Implement close on escape key press
- [ ] T093 [US6] Add loading state to sign-out button
- [ ] T094 [US6] Integrate ProfileDropdown with AppHeader
- [ ] T095 [US6] Test dropdown animation: smooth scale + fade
- [ ] T096 [US6] Test close on outside click: works correctly
- [ ] T097 [US6] Test sign-out: loading state shows, redirects to landing

**Checkpoint**: At this point, User Story 6 should be fully functional - profile dropdown working

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, performance optimization, testing, documentation

- [ ] T098 [P] Verify all animations run at 60fps (no jank)
- [ ] T099 [P] Run Lighthouse audit: verify score remains 90+
- [ ] T100 [P] Measure CLS: verify < 0.1 (zero layout shift)
- [ ] T101 [P] Test all page transitions: complete within 300ms
- [ ] T102 [P] Verify reduced motion preference respected 100%
- [ ] T103 [P] Test on all breakpoints: 320px, 768px, 1024px, 1280px
- [ ] T104 [P] Test on all major browsers: Chrome, Firefox, Safari, Edge
- [ ] T105 [P] Create UI testing checklist document
- [ ] T106 [P] Document design system usage in README
- [ ] T107 [P] Add component catalog to documentation
- [ ] T108 [P] Run full E2E test suite with Playwright
- [ ] T109 [P] Fix any visual regressions or bugs found
- [ ] T110 [P] Final visual review: ensure premium polish throughout

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Navigation)**: Can start after Foundational - No dependencies
- **User Story 2 (P1 - Visual Design)**: Can start after Foundational - Independent
- **User Story 3 (P2 - Transitions)**: Depends on US1, US2 (need layout and design)
- **User Story 4 (P2 - Interactions)**: Depends on US2 (need styled components)
- **User Story 5 (P1 - Mobile)**: Can start after Foundational - Independent
- **User Story 6 (P2 - Profile)**: Depends on US1 (need header layout)

### Within Each User Story

- Components before integration
- Animations after components styled
- Tests (if included) after implementation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T001-T015)
- All Foundational tasks marked [P] can run in parallel (T016-T025)
- Once Foundational is done:
  - Developer A: User Story 1 (Navigation)
  - Developer B: User Story 2 (Visual Design)
  - Developer C: User Story 5 (Mobile) - can start immediately
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (Navigation)

```bash
# Launch all navigation tasks together:
Task: "T026 [P] [US1] Add navigation items array to AppSidebar"
Task: "T027 [P] [US1] Implement sidebar collapse/expand toggle button"
Task: "T028 [US1] Add Framer Motion layout animation to AppSidebar"

# These can run in parallel - different files, no dependencies
```

---

## Parallel Example: User Story 2 (Visual Design)

```bash
# Launch all design tasks together:
Task: "T038 [P] [US2] Apply design tokens to all Button components"
Task: "T039 [P] [US2] Apply design tokens to all Card components"
Task: "T040 [P] [US2] Apply design tokens to all Input components"

# All these tasks affect different files - can run in parallel
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 5 - All P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Navigation)
4. Complete Phase 4: User Story 2 (Visual Design)
5. Complete Phase 7: User Story 5 (Mobile)
6. **STOP and VALIDATE**: Test navigation, visual design, mobile responsiveness
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Navigation) → Test independently → Deploy/Demo (Sidebar works!)
3. Add User Story 2 (Visual Design) → Test independently → Deploy/Demo (Premium look!)
4. Add User Story 5 (Mobile) → Test independently → Deploy/Demo (Mobile ready!)
5. Add User Story 3 (Transitions) → Test independently → Deploy/Demo (Smooth!)
6. Add User Story 4 (Interactions) → Test independently → Deploy/Demo (Alive!)
7. Add User Story 6 (Profile) → Test independently → Deploy/Demo (Complete!)
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Navigation)
   - Developer B: User Story 2 (Visual Design)
   - Developer C: User Story 5 (Mobile)
3. After P1 stories complete:
   - Developer A: User Story 3 (Transitions)
   - Developer B: User Story 4 (Interactions)
   - Developer C: User Story 6 (Profile)
4. All developers: Phase 9 (Polish & Cross-Cutting)

---

## Task Summary

| Phase | User Story | Task Count | Priority |
|-------|-----------|------------|----------|
| Phase 1 | Setup | 15 | N/A |
| Phase 2 | Foundational | 10 | N/A |
| Phase 3 | US1: Navigation | 12 | P1 (MVP) |
| Phase 4 | US2: Visual Design | 13 | P1 (MVP) |
| Phase 5 | US3: Transitions | 10 | P2 |
| Phase 6 | US4: Interactions | 12 | P2 |
| Phase 7 | US5: Mobile | 12 | P1 (MVP) |
| Phase 8 | US6: Profile | 13 | P2 |
| Phase 9 | Polish | 13 | N/A |
| **Total** | **All** | **110** | **All** |

**MVP Scope** (P1 stories only): Phases 1-4 + Phase 7 = **62 tasks**

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are OPTIONAL - include only if explicitly requested or TDD approach desired
- All animations must respect `prefers-reduced-motion` media query
- Touch targets must be minimum 44x44px on mobile (320-767px)

---

**Ready for Implementation**: All tasks are specific enough that an LLM agent can complete them without additional context. Each task includes exact file paths and clear acceptance criteria.

**Next Command**: `/sp.implement` to begin implementation in priority order (P1 → P2)
