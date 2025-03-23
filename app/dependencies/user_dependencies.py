from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import get_db
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService

def get_user_repository(db : Session = Depends(get_db)):
    return UserRepository(db)

def get_user_service(repository : UserService = Depends(get_user_repository)):
    return UserService(repository)