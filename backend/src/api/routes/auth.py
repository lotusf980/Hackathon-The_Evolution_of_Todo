"""
Auth Routes
User registration and login endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from datetime import datetime, timedelta

from ...core.database import get_db
from ...core.security import create_access_token
from ...core.config import settings
from ...schemas.auth import UserCreate, UserLogin, AuthResponse, UserResponse
from ...services.auth_service import register_user, login_user, create_user_token

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user account
    
    - **email**: Valid email address
    - **password**: Password (min 8 characters, must contain a number)
    """
    try:
        # Register user
        user = register_user(db, user_data)
        
        # Create JWT token
        token = create_user_token(user)
        expires_at = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        return AuthResponse(
            user=UserResponse(
                id=user.id,
                email=user.email,
                created_at=user.created_at,
            ),
            token=token,
            expires_at=expires_at,
        )
        
    except ValueError as e:
        error_msg = str(e)
        if "already registered" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        elif "number" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must contain at least one number"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )


@router.post("/login", response_model=AuthResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Sign in with email and password
    
    - **email**: User's email address
    - **password**: User's password
    """
    try:
        # Authenticate user
        user = login_user(db, credentials)
        
        # Create JWT token
        token = create_user_token(user)
        expires_at = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        return AuthResponse(
            user=UserResponse(
                id=user.id,
                email=user.email,
                created_at=user.created_at,
            ),
            token=token,
            expires_at=expires_at,
        )
        
    except ValueError as e:
        if "Invalid credentials" in str(e):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=str(e)
            )
