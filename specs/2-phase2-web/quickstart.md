# Quickstart Guide: Phase 2 - Todo Full-Stack Web Application

## Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Python 3.13+
- UV package manager (recommended) or pip
- PostgreSQL (or access to Neon Serverless PostgreSQL)
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
uv sync  # or pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database connection details and auth secrets

# Initialize the database
python -m database.init
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install  # or yarn install or pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your backend API URL and auth configuration
```

### 4. Environment Configuration

#### Backend (.env)
```
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Running the Application

### 1. Start the Backend Server
```bash
# From the backend directory
uv run uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend Development Server
```bash
# From the frontend directory
npm run dev  # or yarn dev or pnpm dev
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend API Documentation: http://localhost:8000/docs

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tasks API
- `GET /api/{user_id}/tasks` - List all tasks for authenticated user
- `POST /api/{user_id}/tasks` - Create a new task for authenticated user
- `GET /api/{user_id}/tasks/{id}` - Get specific task details
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion status

## Development Workflow

### Backend Development
1. Make changes to Python files in the `backend/` directory
2. The server will automatically reload with `--reload` flag
3. Test API endpoints via the interactive documentation at `/docs`

### Frontend Development
1. Make changes to React components in the `frontend/src/` directory
2. The development server will automatically reload
3. Access the application at http://localhost:3000

## Database Migrations
```bash
# Run migrations (if using Alembic)
cd backend
alembic upgrade head
```

## Testing

### Backend Tests
```bash
# From the backend directory
pytest tests/
```

### Frontend Tests
```bash
# From the frontend directory
npm run test  # or yarn test
```

## Deployment

### Backend
1. Ensure environment variables are properly set for production
2. Use a production WSGI server like Gunicorn:
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Frontend
1. Build the application:
   ```bash
   npm run build  # or yarn build
   ```
2. Serve the built application using your preferred method

## Troubleshooting

### Common Issues
- **Database Connection**: Verify your DATABASE_URL is correctly configured
- **Authentication**: Ensure BETTER_AUTH_SECRET is the same across frontend and backend
- **API Communication**: Check that NEXT_PUBLIC_API_BASE_URL points to your running backend
- **CORS Issues**: Verify CORS settings in the backend are configured correctly

### API Error Codes
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Attempting to access another user's data
- `404 Not Found`: Resource does not exist
- `422 Validation Error`: Request body validation failed
- `500 Internal Server Error`: Unexpected server error