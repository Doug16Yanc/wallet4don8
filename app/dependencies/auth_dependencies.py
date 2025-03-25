from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import get_db
from app.repositories.auth_repository import AuthRepository
from app.services.auth_services import AuthService

def get_auth_repository(db : Session = Depends(get_db)):
    return AuthRepository(db)

def get_auth_service(repository : AuthRepository = Depends(get_auth_repository)):
    return AuthService(repository)

