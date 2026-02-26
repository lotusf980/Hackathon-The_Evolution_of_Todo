<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (MAJOR - Initial constitution)
Modified principles: None (initial creation)
Added sections:
  - Project Overview
  - Core Principles (5 principles)
  - Non-Functional Requirements
  - Technology Stack and Tools
  - Development Workflow
  - Project Structure
  - Deliverables and Success Criteria
  - Governance
Removed sections: None (initial creation)
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ No updates needed (generic)
  - .specify/templates/spec-template.md ✅ No updates needed (generic)
  - .specify/templates/tasks-template.md ✅ No updates needed (generic)
Follow-up TODOs: None
-->

# Todo - Phase 1: In-Memory Python Console App Constitution

## Project Overview

**Objective**: Build a minimal, in-memory Todo application with a console-based interface as Phase 1 of a multi-phase project.

**Phase Focus**: MVP implementation with 5 core CRUD operations for task management.

**Key Constraints**:
- **In-Memory Storage**: No persistent database; data exists only during runtime
- **Console Interface**: Text-based user interaction via stdin/stdout
- **Python Standard Library Only**: Zero external dependencies beyond stdlib
- **Spec-Driven Development**: All features derived from versioned specifications

**MVP Definition**: A working console application demonstrating all 5 features without errors, with clean code structure and passing tests.

---

## Core Principles

### I. Simplicity First

The application MUST use the simplest possible implementation approach that satisfies requirements. Prefer straightforward functions over complex abstractions. Avoid premature optimization, design patterns, or architectural complexity until proven necessary. Each feature should be understandable in isolation.

**Rationale**: Phase 1 is a learning foundation; complexity impedes iteration speed.

### II. In-Memory Only

All task data MUST reside in memory during runtime. No file I/O, database connections, or external storage mechanisms are permitted in this phase. Data loss on application exit is expected and acceptable behavior.

**Rationale**: Isolates core logic from persistence complexity; enables future phases to layer storage strategies.

### III. Console-First User Experience

All user interactions MUST occur via text-based console I/O. Input via stdin (or command arguments), output via stdout, errors via stderr. Prompts must be clear, error messages actionable, and output formatted for human readability.

**Rationale**: Establishes clean I/O boundaries; enables future UI layers (GUI, web) without business logic changes.

### IV. Testable by Design (NON-NEGOTIABLE)

Every feature MUST be independently testable. Core business logic MUST be separated from I/O handling. Functions should be pure where possible, accepting inputs and returning outputs without side effects. Unit tests MUST verify behavior without requiring console interaction.

**Rationale**: Enables automated verification; prevents regression during future phase iterations.

### V. Clean Code Standards

All code MUST adhere to PEP 8 style guidelines. Type hints MUST be used for function signatures. Functions MUST have single responsibilities. Modules MUST be organized by concern (e.g., `todo.py` for domain logic, `main.py` for CLI entry point). Magic numbers and strings MUST be named constants.

**Rationale**: Maintains readability for collaboration and future phase handoff; establishes professional habits.

---

## Non-Functional Requirements

### Code Quality

- **PEP 8 Compliance**: All code must pass `flake8` or equivalent linting
- **Type Hints**: Mandatory for all function parameters and return values
- **Modularity**: Maximum 50 lines per function; maximum 200 lines per module (guideline, not hard limit)
- **Documentation**: Docstrings required for all public functions and classes

### Error Handling

- **Graceful Degradation**: Invalid input MUST produce helpful error messages, not crashes
- **Input Validation**: All user input MUST be validated before processing
- **Error Messages**: Must be actionable (tell user what went wrong and how to fix)

### User Experience

- **Responsive**: All operations must complete in under 100ms (trivial for in-memory ops)
- **Intuitive**: Menu-driven navigation with clear options
- **Forgiving**: Invalid IDs or commands prompt retry, not termination

---

## Technology Stack and Tools

### Runtime

- **Python**: 3.13+ (latest stable)
- **Package Manager**: UV (for dependency management, though stdlib only in Phase 1)

### Development Tools

- **Spec-Kit Plus**: For specification generation and prompt history tracking
- **Qwen AI**: For AI-assisted code generation from specifications
- **Git**: Version control with conventional commits

### Testing (Optional but Recommended)

- **pytest**: For unit and integration testing (if tests implemented)
- **unittest**: Alternative (stdlib, no dependencies)

### Linting & Formatting

- **flake8**: Style guide enforcement
- **black**: Code formatting (optional)
- **mypy**: Type checking (optional but recommended)

---

## Development Workflow

### Spec-Driven Process

1. **Constitution** (Current): Define high-level principles and constraints
2. **Specification** (`/sp.specify`): Generate detailed feature specs in `specs_history/` folder
3. **Planning** (`/sp.plan`): Create implementation plan with technical decisions
4. **Tasks** (`/sp.tasks`): Break down into testable implementation tasks
5. **Implementation**: Write code in `/src` following tasks
6. **Testing**: Verify all acceptance criteria pass
7. **Refinement**: Iterate based on test results or spec changes

### Version Control

- **Branch Naming**: `<phase>-<feature>` (e.g., `phase1-add-task`)
- **Commits**: Conventional format (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Spec Versioning**: Semantic versioning for specs in `specs_history/` (e.g., `v1.0.0_add_task.spec.yaml`)

### Iteration Cycle

1. Implement one user story at a time
2. Test immediately after implementation
3. Commit working changes frequently
4. Update specs if requirements evolve

---

## Project Structure

```
C:\Hackathon\Hackathon_Todo\Phase 1\
├── .specify/                    # Spec-Kit Plus configuration
│   ├── memory/
│   │   └── constitution.md      # This file
│   ├── templates/               # Templates for specs, plans, tasks
│   └── scripts/                 # Automation scripts
├── specs_history/               # Versioned specification files
│   └── v1.0.0_*.spec.yaml       # Feature specs (generated)
├── src/                         # Python source code
│   ├── __init__.py
│   ├── main.py                  # CLI entry point
│   └── todo.py                  # Core Todo domain logic
├── tests/                       # Test files (optional)
│   ├── __init__.py
│   ├── test_todo.py             # Unit tests for todo.py
│   └── test_main.py             # Integration tests for CLI
├── .gitignore
├── README.md                    # Setup instructions and demos
├── pyproject.toml               # Project metadata (UV managed)
└── constitution.md              # Symlink or copy of .specify/memory/constitution.md
```

### File Responsibilities

- **`todo.py`**: Pure business logic (Task class, TodoList manager, CRUD operations)
- **`main.py`**: CLI handling (input parsing, output formatting, error display)
- **`test_todo.py`**: Unit tests for domain logic (no I/O)
- **`test_main.py`**: Integration tests for user workflows
- **`README.md`**: Setup (`uv venv`), run instructions, feature demos with sample I/O

---

## Deliverables and Success Criteria

### Mandatory Deliverables

1. **Working Application**: Console app demonstrating all 5 features
2. **Source Code**: Clean, documented Python modules in `/src`
3. **README**: Setup instructions, usage examples, feature demonstrations
4. **Specifications**: Versioned spec files in `specs_history/`
5. **Git History**: Clean commit history with conventional messages

### Feature Checklist

- [ ] **Add Task**: Input title/description, auto-assign sequential ID starting at 1
- [ ] **Delete Task**: Remove by ID, handle invalid/non-existent IDs gracefully
- [ ] **Update Task**: Modify title and/or description by ID
- [ ] **View Task List**: Display all tasks with ID, title, description, completion status (`[ ]` or `[x]`)
- [ ] **Mark as Complete**: Toggle completion state by ID

### Success Criteria

1. **All Specs Pass**: Every user story acceptance criteria verified
2. **Clean Code**: No linting errors, type hints present, modular structure
3. **Error-Free Execution**: App runs without crashes for valid and invalid inputs
4. **User-Friendly**: Clear prompts, helpful error messages, intuitive navigation
5. **Testable**: Core logic separable from I/O for unit testing

---

## Governance

### Amendment Process

This constitution MAY be amended when:
- New phases introduce requirements incompatible with current principles
- Technical constraints discovered during implementation necessitate principle refinement
- Team consensus identifies clearer formulations without semantic changes

**Amendment Steps**:
1. Propose change with rationale
2. Update constitution version per semantic versioning
3. Document changes in Sync Impact Report (top comment)
4. Update dependent templates if needed

### Versioning Policy

**Format**: `MAJOR.MINOR.PATCH`

- **MAJOR**: Backward-incompatible changes (principle removal, redefinition, scope expansion)
- **MINOR**: New principles, sections, or material expansions
- **PATCH**: Clarifications, wording improvements, typo fixes

**Version Location**: Bottom of this document and Sync Impact Report comment

### Compliance Review

All pull requests MUST verify constitution compliance:
- Code adheres to stated principles
- No violations of non-functional requirements
- Dependencies align with technology stack

**Review Checklist**:
- [ ] Principles respected in implementation
- [ ] Type hints present
- [ ] Error handling adequate
- [ ] Tests cover core logic
- [ ] Documentation updated

---

**Version**: 1.0.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26
