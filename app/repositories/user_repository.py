from sqlalchemy.orm import Session
from app.schemas import user_schema
from app.models.user import User
import bcrypt

class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: user_schema.UserCreate):
        try:
            hashed_password = bcrypt.hashpw(user.user_password.encode('utf-8'), bcrypt.gensalt())
            db_user = User(user_name=user.user_name, user_email=user.user_email, user_password=hashed_password.decode('utf-8'), is_admin = user.is_admin)
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            return user_schema.UserResponse.from_orm(db_user)
        except Exception as e:
            self.db.rollback()
            raise e

    def find_user_by_email(self, email: str):
        return self.db.query(User).filter(User.user_email == email).first()

    def get_all(self):
        db_users = self.db.query(User).all()
        return [user_schema.UserResponse.from_orm(user) for user in db_users]
    
    def update_password(self, email: str, new_password: str):
        user = self.find_user_by_email(email)
        if user:
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            user.user_password = hashed_password.decode('utf-8')
            self.db.commit()
            return True
        return False
