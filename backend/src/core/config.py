"""
Core Configuration
Environment variables and app settings
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    
    # App settings
    APP_NAME: str = "The Evolution of Todo - Backend API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True
    
    # Database settings
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/todo_db"
    
    # JWT settings (MUST match frontend BETTER_AUTH_SECRET)
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # CORS settings
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
