"""
Auth Service
User registration and authentication logic
"""

from sqlmodel import Session, select
from ..core.security import get_password_hash, create_access_token, decode_access_token
from ..models.user import User
from ..schemas.auth import UserCreate, UserLogin
from datetime import timedelta
from ..core.config import settings
import re


def register_user(db: Session, user_data: UserCreate) -> User:
    """
    Register a new user
    
    Args:
        db: Database session
        user_data: User registration data
        
    Returns:
        Created user
        
    Raises:
        ValueError: If email already exists or password is invalid
    """
    # Validate password contains at least one number
    if not re.search(r'\d', user_data.password):
        raise ValueError("Password must contain at least one number")
    
    # Check if email already exists
    existing_user = db.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise ValueError("Email already registered")
    
    # Create new user with hashed password
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        hashed_password=hashed_password,
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user


def login_user(db: Session, credentials: UserLogin) -> User:
    """
    Authenticate user and return user if valid
    
    Args:
        db: Database session
        credentials: Login credentials
        
    Returns:
        Authenticated user
        
    Raises:
        ValueError: If credentials are invalid
    """
    # Find user by email
    user = db.exec(select(User).where(User.email == credentials.email)).first()
    
    if not user:
        # Return generic error to prevent email enumeration
        raise ValueError("Invalid credentials")
    
    # Verify password
    if not get_password_hash(credentials.password):
        raise ValueError("Invalid credentials")
    
    return user


def create_user_token(user: User) -> str:
    """
    Create JWT token for user
    
    Args:
        user: User to create token for
        
    Returns:
        JWT token string
    """
    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.id, "email": user.email},
        expires_delta=expires_delta
    )
    return token


def verify_token(token: str) -> dict | None:
    """
    Verify JWT token and return payload
    
    Args:
        token: JWT token to verify
        
    Returns:
        Token payload if valid, None otherwise
    """
    return decode_access_token(token)
