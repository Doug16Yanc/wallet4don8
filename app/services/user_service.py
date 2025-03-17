from sqlalchemy.orm import Session
from app.repositories import UserRepository
from app import schemas
from app.exceptions import UserAlreadyExists

class UserService:

    @staticmethod
    def create_user(db : Session, user: schemas.UserCreate):
        existing_user = UserRepository.find_user_by_email(db, user)

        if existing_user:
            raise UserAlreadyExists()
        return UserRepository.create_user(db, user)
    
