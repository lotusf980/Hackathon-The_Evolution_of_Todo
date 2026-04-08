"""
API Dependencies
JWT extraction and user authentication
"""

from fastapi import Header, HTTPException, status
from ..core.security import decode_access_token


async def get_current_user_id(authorization: str = Header(..., description="Bearer token")) -> str:
    """
    Extract user ID from JWT token
    
    Expects: Authorization: Bearer <token>
    Returns: user_id from token payload
    
    Raises:
        HTTPException 401: Invalid or expired token
    """
    # Extract token from "Bearer <token>" format
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format"
        )
    
    token = authorization.replace("Bearer ", "")
    
    # Decode and validate token
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    return user_id
