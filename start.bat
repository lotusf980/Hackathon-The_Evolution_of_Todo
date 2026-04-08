@echo off
echo Starting The Evolution of Todo - Full Stack...
echo.

echo [1/2] Starting Frontend (Next.js) on port 3000...
start "Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Backend (FastAPI) on port 8000...
start "Backend" cmd /k "cd backend && set DATABASE_URL=postgresql://neondb_owner:npg_bTZ20GXFBHuv@ep-jolly-block-aikofyw0-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require && uvicorn src.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo ================================================
echo   SERVICES STARTED!
echo ================================================
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo ================================================
echo.
echo Press any key to check status...
pause >nul

netstat -ano | findstr "3000 8000"
