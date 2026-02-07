import sys
import os
# Add the current directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

# Import modules using absolute imports
from routes.auth import router as auth_router
from routes.tasks import router as tasks_router
from database.database import create_db_and_tables

# Import models to register them with SQLModel
from models.user import User
from models.task import Task

app = FastAPI(
    title="Todo API",
    description="API for the Todo Full-Stack Web Application",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(tasks_router)

@app.on_event("startup")
async def on_startup():
    """
    Create database tables on startup.
    """
    create_db_and_tables()

@app.get("/")
def read_root():
    """
    Root endpoint for the API.
    """
    return {"message": "Todo API - Welcome!"}

@app.get("/health")
def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy"}