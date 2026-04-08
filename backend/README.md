# Backend API - The Evolution of Todo Phase II

FastAPI backend for the multi-user todo application with JWT authentication and PostgreSQL persistence.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Start development server
uvicorn src.main:app --reload
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

```bash
pytest
pytest --cov=src
```

See full setup instructions in `specs/2-backend-api/quickstart.md`
