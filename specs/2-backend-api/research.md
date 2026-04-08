# Research & Technical Decisions: Backend API

**Feature**: 2-backend-api  
**Date**: 2025-12-30  
**Spec**: [spec.md](./spec.md)

## Purpose

Document all technical decisions made during Phase 0 research to resolve `NEEDS CLARIFICATION` markers from the implementation plan.

---

## Decision 1: ORM Choice

**Question**: SQLModel vs SQLAlchemy vs Tortoise ORM?

### Decision
Use **SQLModel 0.0.14+**

### Rationale
- Combines SQLAlchemy (mature ORM) with Pydantic (validation)
- Type-safe by default with Python type hints
- Reduces boilerplate (single model definition for DB + API)
- Created by FastAPI author, seamless integration
- Perfect for FastAPI projects

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| SQLAlchemy Core + Pydantic | More control, mature | More boilerplate, two model definitions | Rejected |
| Tortoise ORM | Async, fast | Less mature ecosystem, smaller community | Rejected |
| Raw SQL | Maximum control, no ORM overhead | Error-prone, no type safety, SQL injection risk | Rejected |
| SQLModel | Type-safe, less boilerplate, FastAPI integration | Newer (but stable) | **Selected** |

---

## Decision 2: JWT Library

**Question**: python-jose vs PyJWT vs cryptography?

### Decision
Use **python-jose[cryptography] 3.3+**

### Rationale
- Supports multiple algorithms (HS256, RS256, etc.)
- Well-maintained, widely used in FastAPI ecosystem
- Simple API for encode/decode
- cryptography extra provides secure backend

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| PyJWT | Simpler API, popular | Fewer algorithm options | Rejected |
| cryptography.io | Lower-level control | More complex, overkill | Rejected |
| python-jose | Multiple algorithms, standard for FastAPI | Slightly larger bundle | **Selected** |

---

## Decision 3: Password Hashing

**Question**: passlib+bcrypt vs bcrypt vs argon2?

### Decision
Use **passlib[bcrypt] 1.7+** with bcrypt cost factor 12

### Rationale
- passlib provides unified API for multiple hashing schemes
- bcrypt is industry standard, battle-tested
- Cost factor 12 balances security and performance
- passlib makes future algorithm upgrades easy

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| bcrypt (direct) | Simple, focused | Less flexible for upgrades | Rejected |
| argon2 | Newer, more secure against GPU attacks | Slower, less battle-tested | Rejected |
| pbkdf2 | Built-in to Python | Slower than bcrypt | Rejected |
| passlib+bcrypt | Unified API, easy upgrades, industry standard | Slightly larger dependency | **Selected** |

---

## Decision 4: Database Driver

**Question**: psycopg2 vs asyncpg?

### Decision
Use **psycopg2-binary 2.9+** (synchronous)

### Rationale
- Mature, stable, widely tested
- SQLModel works well with sync drivers
- Connection pooling handles concurrency
- asyncpg adds complexity without significant benefit for MVP scale

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| asyncpg | Async, faster | Requires async session, more complex | Rejected |
| psycopg3 | Newer version | psycopg2 is stable, sufficient | Rejected |
| psycopg2-binary | Zero config, stable, widely used | Synchronous | **Selected** |

---

## Decision 5: Dependency Injection

**Question**: FastAPI Depends() vs manual dependency management?

### Decision
Use **FastAPI's Depends()** for all dependencies

### Rationale
- Automatic dependency resolution
- Testable (override dependencies in tests)
- Clear, declarative syntax
- Reusable across endpoints

### Implementation

```python
# Extract user_id from JWT token
def get_current_user_id(token: str = Header(...)) -> str:
    payload = decode_access_token(token)
    return payload["sub"]

# Get database session
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Usage in endpoints
@router.get("/todos")
def list_todos(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    ...
```

---

## Decision 6: Error Handling

**Question**: FastAPI HTTPException vs custom exception handler?

### Decision
Use **FastAPI's HTTPException** with custom handler for logging

### Rationale
- Built-in support, automatic OpenAPI docs
- Consistent response format
- Can add custom handler for additional logging

### Implementation

```python
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"{request.method} {request.url} - {exc.status_code}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
```

---

## Decision 7: CORS Configuration

**Question**: Allow all origins vs specific origins?

### Decision
Configure CORS with **specific allowed origins**

### Rationale
- Security best practice (don't allow all origins)
- Frontend URL known (http://localhost:3000 for dev)
- Credentials support required for cookies

### Implementation

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Summary of Decisions

| Decision | Choice | Impact |
|----------|--------|--------|
| ORM | SQLModel | Type-safe, less boilerplate |
| JWT Library | python-jose | Standard for FastAPI |
| Password Hashing | passlib+bcrypt | Industry standard, secure |
| Database Driver | psycopg2-binary | Mature, stable |
| Dependency Injection | FastAPI Depends | Clean, testable |
| Error Handling | HTTPException + handler | Consistent, logged |
| CORS | Specific origins | Secure, credentials support |

All decisions align with constitution principles:
- ✅ Spec-first (documented before implementation)
- ✅ Security (JWT validation, password hashing, user isolation)
- ✅ Type safety (SQLModel, Pydantic, type hints)
- ✅ Performance (connection pooling, sync driver sufficient)
- ✅ Maintainability (clear structure, dependency injection)

---

**Status**: ✅ COMPLETE - All `NEEDS CLARIFICATION` markers resolved  
**Next Phase**: Phase 1 (Data Model, API Contracts, Quickstart)
