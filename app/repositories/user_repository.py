from sqlalchemy.orm import Session
from app.schemas import user_schema
from app.models.user import User
import bcrypt

class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, user: user_schema.UserCreate):
        try:
            hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
            db_user = User(name=user.name, email=user.email, password=hashed_password.decode('utf-8'))
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            return user_schema.UserResponse.from_orm(db_user)
        except Exception as e:
            self.db.rollback()
            raise e

    def get_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()

    def get_all(self):
        db_users = self.db.query(User).all()
        return [user_schema.UserResponse.from_orm(user) for user in db_users]
