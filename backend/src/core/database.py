"""
Database Configuration
PostgreSQL connection with SQLModel
"""

from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.orm import sessionmaker
from .config import settings

# Import all models to ensure they're registered before table creation
from ..models.user import User
from ..models.todo import Todo

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    echo=settings.DEBUG,
    pool_size=10,
    max_overflow=20
)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=Session
)


def create_db_and_tables():
    """Create database tables"""
    SQLModel.metadata.create_all(bind=engine)


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
