<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 2.0.0 (MAJOR)
Rationale: Complete architectural transformation from Phase I (single-user console app) to Phase II (multi-user full-stack web application)

Modified Principles:
- All principles replaced: Phase I console-focused → Phase II full-stack web-focused

Added Sections:
- Project Overview (Phase II context)
- Authentication & Security (JWT, Better Auth, user isolation)
- Technology Stack and Tools (Next.js, FastAPI, Neon PostgreSQL)
- Development Workflow (agentic, no-manual-coding)
- Monorepo Structure (frontend/backend separation)
- Guiding Principles (Phase II specific)
- Deliverables and Success Criteria

Removed Sections:
- Phase I console-specific principles (CLI interface, text I/O protocols)

Template Updates Required:
- ✅ plan-template.md: Compatible (Constitution Check section generic)
- ✅ spec-template.md: Compatible (user story format unchanged)
- ✅ tasks-template.md: Compatible (phase structure supports web apps)

Follow-up TODOs:
- TODO(RATIFICATION_DATE): Confirm official Phase II launch date (using 2025-12-30 as placeholder)
-->

# The Evolution of Todo Constitution - Phase II

**Version**: 2.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30

## Project Overview

The Evolution of Todo Phase II represents a complete architectural transformation from a single-user in-memory console application (Phase I) to a modern, secure, multi-user full-stack web application with persistent storage. This constitution serves as the foundational governance document for all Phase II development activities.

**MVP Focus**:
- Transition from console to responsive web UI
- Multi-user support with secure authentication
- Persistent storage using Neon PostgreSQL
- Core todo features (Add, Delete, Update, View, Mark Complete) with mandatory user isolation
- RESTful API architecture
- Agentic development workflow (no manual coding)

## Core Principles

### I. Spec-First Development (NON-NEGOTIABLE)

All development MUST follow the Spec-Kit Plus workflow in strict sequence:

1. **Constitution** → This document (v2.0.0)
2. **Specification** → Feature specs with user stories, requirements, success criteria
3. **Plan** → Architecture decisions, technical approach, project structure
4. **Tasks** → Testable implementation tasks with clear dependencies
5. **Implementation** → Agent-executed code generation
6. **Testing** → Validation against acceptance criteria
7. **Iteration** → Refinement based on test results

**Rationale**: Spec-first ensures clarity, reduces rework, enables parallel agent execution, and provides complete documentation for hackathon judging. No code is written without an approved spec and plan.

**Compliance Check**: All PRs MUST reference corresponding spec.md and plan.md files.

### II. Security by Design - User Isolation (NON-NEGOTIABLE)

All data operations MUST enforce strict user isolation. No user may access, modify, or view another user's todos under any circumstances.

**Implementation Requirements**:
- JWT-based authentication using Better Auth (Next.js) + FastAPI middleware
- Every API request MUST include valid JWT token
- FastAPI middleware MUST verify token and extract `user_id` before processing
- All database queries MUST include `WHERE user_id = :authenticated_user_id`
- User isolation MUST be tested via integration tests for all CRUD operations

**Rationale**: Multi-user applications require absolute data segregation. Security cannot be an afterthought.

**Compliance Check**: All API endpoint implementations MUST show user_id extraction and filtering in database queries.

### III. RESTful API Design (NON-NEGOTIABLE)

All backend functionality MUST be exposed via RESTful API endpoints following consistent conventions:

**Core Todo API Endpoints**:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/todos` | Create new todo | Yes (JWT) |
| GET | `/api/todos` | List all user's todos | Yes (JWT) |
| GET | `/api/todos/{id}` | Get specific todo | Yes (JWT) |
| PUT | `/api/todos/{id}` | Update todo | Yes (JWT) |
| DELETE | `/api/todos/{id}` | Delete todo | Yes (JWT) |
| PATCH | `/api/todos/{id}/complete` | Mark todo complete | Yes (JWT) |

**API Standards**:
- All responses MUST use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- All responses MUST return JSON with consistent structure
- All errors MUST include descriptive error messages
- All endpoints MUST require JWT authentication (no public endpoints for todo operations)

**Rationale**: RESTful APIs enable frontend/backend independence, simplify testing, and prepare for Phase III (chatbot integration).

### IV. Type Safety & Code Quality (NON-NEGOTIABLE)

**Frontend (TypeScript)**:
- All code MUST be written in TypeScript (no JavaScript)
- All interfaces, props, and API responses MUST have explicit type definitions
- No `any` types allowed without explicit `// eslint-disable-next-line @typescript-eslint/no-explicit-any` with justification
- Strict mode MUST be enabled in `tsconfig.json`

**Backend (Python)**:
- All code MUST follow PEP 8 style guidelines
- All functions MUST include type hints
- Pydantic models MUST be used for request/response validation
- FastAPI dependency injection MUST be used for authentication

**Rationale**: Type safety catches errors at compile time, improves IDE support, and enables more reliable agent-generated code.

### V. Agentic Development - No Manual Coding (NON-NEGOTIABLE)

All implementation work MUST be performed exclusively via Qwen Code agents and skills. Manual coding is strictly prohibited.

**Allowed Tools**:
- Qwen Code CLI commands (`/sp.constitution`, `/sp.specify`, `/sp.plan`, `/sp.tasks`, `/sp.implement`)
- Qwen Code skills (file operations, testing, refactoring)
- MCP tools (GitHub, Context7, web search)

**Prohibited Actions**:
- Manual file editing outside agent commands
- Copy-pasting code from external sources
- Writing code without spec/plan/task artifacts

**Rationale**: Ensures complete process transparency for hackathon judging, demonstrates advanced agentic development capabilities, and maintains full audit trail.

**Compliance Check**: Git history MUST show all code changes originated from agent tool executions.

### VI. Docker-First Local Development

All local development MUST use Docker Compose for consistency and reproducibility.

**Requirements**:
- `docker-compose.yml` MUST define: frontend, backend, database services
- Database MUST be Neon PostgreSQL (local container for dev, cloud for prod)
- All environment variables MUST be documented in `.env.example`
- Single command (`docker-compose up`) MUST start entire stack

**Rationale**: Eliminates "works on my machine" issues, simplifies onboarding, and demonstrates production-ready deployment practices.

### VII. Preparation for Phase III (Chatbot Integration)

All Phase II architecture decisions MUST consider future chatbot integration:

**Forward-Compatible Design**:
- API MUST support programmatic todo operations (already RESTful)
- Authentication MUST support service-to-service tokens
- Data models MUST include metadata fields for chatbot context
- Logging MUST capture user interaction patterns

**Rationale**: Phase III will add AI chatbot interface. Phase II must not require breaking changes to support it.

## Authentication & Security

**Architecture**: JWT-based authentication bridge between Better Auth (Next.js frontend) and FastAPI backend using shared `BETTER_AUTH_SECRET`.

**Flow**:
1. User logs in via Next.js frontend using Better Auth
2. Better Auth generates JWT token signed with `BETTER_AUTH_SECRET`
3. Frontend attaches JWT to all API requests via `Authorization: Bearer <token>` header
4. FastAPI middleware verifies token signature using shared `BETTER_AUTH_SECRET`
5. Middleware extracts `user_id` from token payload
6. User ID injected into request context for all database operations
7. All queries automatically filtered by `user_id`

**Security Benefits**:
- Zero-trust architecture: backend never trusts frontend without verification
- Shared secret ensures token integrity across service boundary
- JWT stateless: no session storage required
- Automatic token expiration enforces re-authentication

**Environment Variables** (MUST be identical in frontend and backend):
```bash
BETTER_AUTH_SECRET=<32-character-cryptographically-secure-random-string>
JWT_EXPIRY=1h
```

**Compliance Check**: All API endpoints MUST show JWT verification middleware in route handlers.

## Non-Functional Requirements

### Code Quality
- **TypeScript**: ESLint + Prettier with strict configuration
- **Python**: Black, isort, flake8, mypy for type checking
- **Testing**: Vitest (frontend), Pytest (backend)
- **Coverage**: Minimum 80% line coverage for core business logic

### Modularity
- Frontend: Component-based architecture (React Server Components where applicable)
- Backend: Service layer pattern with clear separation (routes → services → models)
- Shared: No circular dependencies, clear import boundaries

### Responsive UI
- Mobile-first design using Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- All layouts MUST work on mobile, tablet, and desktop

### Error Handling
- HTTP status codes MUST match RFC 7231 standards
- User-facing messages MUST be clear and actionable
- Server errors MUST be logged with full stack traces
- Client errors MUST display user-friendly notifications

### Performance
- API response time: p95 < 200ms for all endpoints
- Initial page load: < 3 seconds on 3G connection
- Database queries: < 50ms for all CRUD operations

### Accessibility
- WCAG 2.1 Level AA compliance for all interactive elements
- Keyboard navigation MUST work for all features
- Color contrast ratios MUST meet 4.5:1 minimum

## Technology Stack and Tools

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend Framework** | Next.js | 16+ | React framework with App Router |
| **Frontend Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS framework |
| **Authentication** | Better Auth | latest | JWT-based auth with Next.js integration |
| **Backend Framework** | FastAPI | 0.100+ | High-performance Python API framework |
| **Database** | Neon PostgreSQL | 15+ | Serverless PostgreSQL with branching |
| **ORM** | SQLAlchemy | 2.x | Python SQL toolkit and ORM |
| **Validation** | Pydantic | 2.x | Data validation using Python type hints |
| **Containerization** | Docker Compose | 2.x | Multi-container orchestration |
| **Development** | Qwen Code | latest | AI agent for spec-driven development |
| **Process** | Spec-Kit Plus | latest | Spec-first development framework |

**Local Development Stack**:
```yaml
# docker-compose.yml services
- frontend: Next.js 16+ (port 3000)
- backend: FastAPI + Python 3.11 (port 8000)
- database: PostgreSQL 15 (port 5432)
```

## Development Workflow

**Strict Agentic Workflow** (no manual coding):

```
┌─────────────────┐
│ 1. Constitution │ ← This document (v2.0.0)
└────────┬────────┘
         │
         v
┌─────────────────┐
│ 2. Specification│ ← /sp.specify (user stories, requirements)
└────────┬────────┘
         │
         v
┌─────────────────┐
│ 3. Architecture │ ← /sp.plan (technical decisions, structure)
└────────┬────────┘
         │
         v
┌─────────────────┐
│ 4. Tasks        │ ← /sp.tasks (testable implementation steps)
└────────┬────────┘
         │
         v
┌─────────────────┐
│ 5. Implementation│ ← Qwen agents execute tasks
└────────┬────────┘
         │
         v
┌─────────────────┐
│ 6. Testing      │ ← Automated + agent-assisted validation
└────────┬────────┘
         │
         v
┌─────────────────┐
│ 7. Iteration    │ ← Refine based on test results
└─────────────────┘
```

**Command Reference**:
- `/sp.constitution` → Update this document
- `/sp.specify` → Create feature specification
- `/sp.plan` → Create architecture plan
- `/sp.tasks` → Generate implementation tasks
- `/sp.implement` → Execute tasks via agents
- `/sp.phr` → Create Prompt History Record

**Branch Strategy**:
- `main` → Production-ready code
- `develop` → Integration branch
- `feature/XXX` → Individual features (one per user story)

## Monorepo Structure

```
C:\Hackathon\Hackathon_Todo\Phase 2\
├── .specify/                    # Spec-Kit Plus configuration
│   ├── memory/
│   │   └── constitution.md      # This file (v2.0.0)
│   ├── templates/
│   │   ├── spec-template.md
│   │   ├── plan-template.md
│   │   ├── tasks-template.md
│   │   ├── adr-template.md
│   │   └── phr-template.prompt.md
│   ├── scripts/
│   └── commands/
│
├── .qwen/                       # Qwen Code configuration
│   └── commands/
│       ├── sp.constitution.toml
│       ├── sp.specify.toml
│       ├── sp.plan.toml
│       ├── sp.tasks.toml
│       ├── sp.implement.toml
│       └── sp.phr.toml
│
├── specs/                       # Feature specifications
│   ├── authentication/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   ├── todo-crud/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   └── user-management/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
│
├── frontend/                    # Next.js 16+ Application
│   ├── QWEN.md                  # Frontend-specific agent guidance
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Dashboard (todo list)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── components/
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   └── TodoList.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts          # Better Auth client
│   │   │   └── api.ts           # API client with JWT
│   │   └── types/
│   │       └── index.ts
│   ├── public/
│   ├── tests/
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                     # FastAPI Application
│   ├── QWEN.md                  # Backend-specific agent guidance
│   ├── src/
│   │   ├── main.py              # FastAPI app entry
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── todos.py
│   │   │   │   └── auth.py
│   │   │   └── deps.py          # Dependencies (JWT extraction)
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py      # JWT verification
│   │   ├── models/
│   │   │   ├── todo.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   ├── todo.py
│   │   │   └── auth.py
│   │   └── services/
│   │       └── todo_service.py
│   ├── tests/
│   │   ├── conftest.py
│   │   ├── test_todos.py
│   │   └── test_auth.py
│   ├── requirements.txt
│   └── pyproject.toml
│
├── history/                     # Prompt History Records
│   ├── prompts/
│   │   ├── constitution/
│   │   ├── authentication/
│   │   ├── todo-crud/
│   │   └── general/
│   └── adr/
│
├── docker-compose.yml           # Local development stack
├── .env.example                 # Environment variable template
├── .gitignore
├── README.md                    # Project overview
└── QWEN.md                      # Root-level agent guidance (this file's context)
```

**Layered QWEN.md Files**:
- **Root** (`/QWEN.md`): Project-wide context, monorepo structure, workflow
- **Frontend** (`/frontend/QWEN.md`): Next.js, TypeScript, Tailwind, Better Auth specifics
- **Backend** (`/backend/QWEN.md`): FastAPI, SQLAlchemy, JWT middleware, PostgreSQL specifics

## Guiding Principles

### 1. Simplicity Over Complexity
- Start with the simplest working solution
- YAGNI (You Aren't Gonna Need It): Don't add features until required
- Prefer built-in solutions over external dependencies

### 2. Maintainability
- Code MUST be self-documenting with clear naming
- Functions MUST be small (< 50 lines) and single-purpose
- Comments explain "why", not "what"

### 3. Full Process Transparency
- All agent interactions captured in PHRs
- Git history MUST reflect spec-driven workflow
- Complete audit trail for hackathon judging

### 4. User Isolation is Absolute
- No exceptions to user data segregation
- All queries MUST include user_id filter
- Integration tests MUST verify isolation

### 5. Demo-Ready at All Times
- `docker-compose up` MUST produce working application
- Sample users and seed data for immediate demonstration
- Error messages MUST be user-friendly

## Deliverables and Success Criteria

### MVP Deliverables

1. **Working Full-Stack Application**
   - Runnable via single `docker-compose up` command
   - Frontend accessible at `http://localhost:3000`
   - Backend API accessible at `http://localhost:8000`
   - Database persists across restarts

2. **Core Features Functional**
   - User registration and login (Better Auth)
   - Create todo (POST /api/todos)
   - View all todos (GET /api/todos)
   - View single todo (GET /api/todos/{id})
   - Update todo (PUT /api/todos/{id})
   - Delete todo (DELETE /api/todos/{id})
   - Mark complete (PATCH /api/todos/{id}/complete)
   - All operations scoped to authenticated user

3. **Secure Multi-User Isolation**
   - User A cannot access User B's todos
   - JWT authentication enforced on all endpoints
   - 401/403 responses for invalid/missing tokens

4. **Responsive UI**
   - Works on mobile (320px), tablet (768px), desktop (1920px)
   - Tailwind CSS for all styling
   - No horizontal scrolling at any breakpoint

5. **Clean Agent-Generated Code**
   - All code via Qwen agents (no manual coding)
   - TypeScript strict mode (frontend)
   - PEP 8 + type hints (backend)
   - No linting errors

6. **Comprehensive Specs History**
   - PHRs for all user prompts
   - Specs for all features
   - Plans for all architecture decisions
   - Tasks for all implementations

### Success Criteria (Measurable)

- **SC-001**: User can register, login, and create first todo in under 2 minutes
- **SC-002**: All 7 API endpoints return correct responses with valid JWT
- **SC-003**: User isolation tests pass 100% (no cross-user data access)
- **SC-004**: Application starts with zero errors via `docker-compose up`
- **SC-005**: All TypeScript and Python type checks pass
- **SC-006**: Demo-ready with 2 sample users, each with 3 sample todos

## Governance

**Amendment Procedure**:
1. Propose change via `/sp.constitution` with rationale
2. Document version bump (MAJOR/MINOR/PATCH) per semantic versioning
3. Update "Last Amended" date to current date
4. Generate Sync Impact Report (HTML comment at top)
5. Validate all dependent templates for consistency
6. Create PHR documenting amendment

**Versioning Policy**:
- **MAJOR**: Backward-incompatible changes (principle removal, architecture shifts)
- **MINOR**: New principles, sections, or material expansions
- **PATCH**: Clarifications, wording improvements, typo fixes

**Compliance Review**:
- All PRs MUST include constitution compliance checklist
- Agents MUST verify principle adherence during implementation
- Hackathon judges will evaluate constitution adherence as primary criterion

**Supremacy Clause**:
This constitution supersedes all other practices, guidelines, or conventions. Any conflict MUST be resolved in favor of constitution principles.

---

**Phase II Launch Date**: 2025-12-30  
**Next Phase**: Phase III (Chatbot Integration) - Q1 2026  
**Hackathon Target**: Advanced Agentic Full-Stack Development Category
