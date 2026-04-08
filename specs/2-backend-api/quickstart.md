# Backend Quickstart Guide

**Feature**: 2-backend-api  
**Date**: 2025-12-30  
**Branch**: `2-backend-api`

## Prerequisites

- **Python 3.11+** installed ([Download](https://python.org))
- **Docker Desktop** installed (for database) ([Download](https://docker.com))
- **Qwen Code** installed (for agentic development)
- **Git** (for version control)

---

## Development Setup

### 1. Start Database

From the repository root:

```bash
cd C:\Hackathon\Hackathon_Todo\Phase 2
docker-compose up -d db
```

This starts:
- **PostgreSQL Database** on `localhost:5432`
- Username: `postgres`
- Password: `postgres`
- Database: `todo_db`

Verify database is running:

```bash
docker-compose ps
```

---

### 2. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

**Windows**:
```bash
venv\Scripts\activate
```

**macOS/Linux**:
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- FastAPI 0.109+ (web framework)
- SQLModel 0.0.14+ (ORM)
- psycopg2-binary 2.9+ (PostgreSQL driver)
- python-jose[cryptography] 3.3+ (JWT)
- passlib[bcrypt] 1.7+ (password hashing)
- uvicorn[standard] 0.27+ (ASGI server)

---

### 4. Configure Environment

```bash
copy .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todo_db

# JWT Settings (MUST match frontend BETTER_AUTH_SECRET)
SECRET_KEY=your-32-character-cryptographically-secure-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# CORS
FRONTEND_URL=http://localhost:3000
```

**Important**: Generate a secure SECRET_KEY:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

### 5. Start Development Server

```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs on `http://localhost:8000`

---

### 6. Verify Setup

1. Open `http://localhost:8000`
   - Should show: `{"message": "The Evolution of Todo - Backend API", "version": "2.0.0", "status": "running"}`

2. Check health: `http://localhost:8000/health`
   - Should show: `{"status": "healthy", "database": "connected"}`

3. View API docs: `http://localhost:8000/docs`
   - Interactive Swagger UI with all endpoints

4. Test registration:
   - Go to `/docs`
   - Find `POST /api/auth/register`
   - Click "Try it out"
   - Enter: `{"email": "test@example.com", "password": "password123"}`
   - Click "Execute"
   - Should receive JWT token in response

---

## Common Commands

```bash
# Run tests
pytest

# Run tests with coverage
pytest --cov=src --cov-report=html

# Run tests in watch mode
pytest -w

# Format code
black src tests
isort src tests

# Lint code
flake8 src tests

# Type check
mypy src

# Check for security issues
bandit -r src
```

---

## Project Structure

```
backend/
├── src/
│   ├── main.py                 # FastAPI app entry
│   ├── core/                   # Core configuration
│   │   ├── config.py           # Environment settings
│   │   ├── database.py         # Database connection
│   │   └── security.py         # JWT, password utilities
│   ├── models/                 # SQLModel entities
│   │   ├── __init__.py
│   │   ├── user.py             # User model
│   │   └── todo.py             # Todo model
│   ├── schemas/                # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── auth.py             # Auth schemas
│   │   └── todo.py             # Todo schemas
│   ├── api/                    # API routes
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py         # Auth endpoints
│   │   │   └── todos.py        # Todo endpoints
│   │   └── deps.py             # Dependencies (JWT)
│   └── services/               # Business logic
│       ├── __init__.py
│       ├── auth_service.py     # Auth logic
│       └── todo_service.py     # Todo CRUD
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Pytest fixtures
│   ├── test_auth.py            # Auth tests
│   └── test_todos.py           # Todo tests
├── .env.example
├── .gitignore
├── requirements.txt
├── pyproject.toml
└── README.md
```

---

## Troubleshooting

### Database Connection Failed

**Problem**: `could not connect to server`

**Solution**:
1. Ensure Docker is running
2. Check database container: `docker-compose ps`
3. Restart database: `docker-compose restart db`
4. Verify DATABASE_URL in `.env`

---

### CORS Errors

**Problem**: `Origin http://localhost:3000 not allowed`

**Solution**:
1. Check FRONTEND_URL in `.env` matches frontend
2. Ensure both frontend and backend are running
3. Verify CORS middleware in `main.py`

---

### JWT Validation Fails

**Problem**: `Invalid token` or `Token expired`

**Solution**:
1. Verify SECRET_KEY in `.env` matches frontend BETTER_AUTH_SECRET
2. Check token hasn't expired (60 minutes)
3. Ensure frontend is sending token in `Authorization: Bearer <token>` header

---

### Import Errors

**Problem**: `ModuleNotFoundError: No module named 'src'`

**Solution**:
1. Ensure you're in the `backend` directory
2. Activate virtual environment
3. Install dependencies: `pip install -r requirements.txt`
4. Run with: `uvicorn src.main:app`

---

### Port Already in Use

**Problem**: `Address already in use` on port 8000

**Solution**:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or change port
uvicorn src.main:app --reload --port 8001
```

---

## API Testing

### Using Swagger UI (/docs)

1. Go to `http://localhost:8000/docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in request body
5. Click "Execute"
6. View response

### Using curl

**Register**:
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

**Login**:
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

**Create Todo** (replace TOKEN with JWT from login):
```bash
curl -X POST "http://localhost:8000/api/todos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title": "My first todo"}'
```

**List Todos**:
```bash
curl -X GET "http://localhost:8000/api/todos" \
  -H "Authorization: Bearer TOKEN"
```

---

## Development Philosophy

This backend prioritizes:

1. **Security First**: User isolation, password hashing, JWT validation
2. **Type Safety**: SQLModel, Pydantic, type hints throughout
3. **Performance**: p95 < 200ms, connection pooling
4. **Maintainability**: Clear structure, dependency injection, testing
5. **Simplicity**: YAGNI principle, no unnecessary complexity

---

## Testing Strategy

### Unit Tests

Test individual functions and services:

```bash
pytest tests/unit/
```

### Integration Tests

Test API endpoints with database:

```bash
pytest tests/integration/
```

### End-to-End Tests

Test full user flows (frontend + backend):

```bash
# From frontend directory
npm run test:e2e
```

---

## Deployment (Future)

### Docker Production

```bash
docker build -t todo-backend .
docker run -p 8000:8000 --env-file .env todo-backend
```

### Cloud Hosting

- **Railway**: Push to GitHub, connect Railway
- **Render**: Deploy from Git repository
- **Heroku**: Use Heroku CLI

---

## Next Steps

After verifying setup:

1. **Review the specification**: `specs/2-backend-api/spec.md`
2. **Review the plan**: `specs/2-backend-api/plan.md`
3. **Run /sp.tasks**: Generate implementation tasks
4. **Start implementing**: Follow tasks in priority order (P1 → P2)

---

**Support**: For issues or questions, create a GitHub issue or ask in the team chat.

**Last Updated**: 2025-12-30
