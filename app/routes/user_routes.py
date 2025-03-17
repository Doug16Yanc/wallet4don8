from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from app import schemas, services

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/create-user", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    return services.UserService.create_user(db, payload)
