from sqlalchemy.orm import Session
from app import models, schemas
import bcrypt 

class UserRepository:

    @staticmethod
    def create_user(db: Session, user: schemas.UserCreate):
        hashed_password = bcrypt.hash(user.password)
        db_user = models.User(name=user.name, email=user.email, password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def find_user_by_email(db: Session, email: str):
        return db.query(models.User).filter(models.User.email == email).first()

    @staticmethod
    def get_users(db: Session):
        return db.query(models.User).all()
