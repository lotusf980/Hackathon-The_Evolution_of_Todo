from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session, select
from typing import Annotated
from datetime import timedelta
from database.database import get_session
from models.user import User, UserCreate, UserRead
from auth.jwt_handler import get_password_hash, authenticate_user, create_access_token
from utils.validators import validate_email_format

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=UserRead)
async def register_user(user: UserCreate, session: Annotated[Session, Depends(get_session)]):
    """
    Register a new user account.
    """
    # Validate email format
    validate_email_format(user.email)

    # Check if user already exists
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = get_password_hash(user.password)

    # Create new user
    db_user = User(
        email=user.email,
        name=user.name,
        password=hashed_password
    )

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@router.post("/login")
async def login_user(user_credentials: dict, session: Annotated[Session, Depends(get_session)]):
    """
    Authenticate user and return JWT token.
    """
    email = user_credentials.get("email")
    password = user_credentials.get("password")

    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and password are required"
        )

    # Find user by email
    statement = select(User).where(User.email == email)
    db_user = session.exec(statement).first()

    if not db_user or not authenticate_user(db_user, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user.id}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "email": db_user.email,
            "name": db_user.name
        }
    }


@router.post("/logout")
async def logout_user():
    """
    Logout user and invalidate session.
    """
    # In a real implementation, you might add the token to a blacklist
    # For now, we just return a success message
    return {"message": "Successfully logged out"}