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

    """Criando o administrador de modo geral já""" 
    def create_admin(self):
        admin_email = "admin@don8.com"
        
        existing_admin = self.find_user_by_email(admin_email)
        if existing_admin:
            print("Administrador já existe.")
            return None
        
        hashed_password = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt())

        admin_user = User(
            user_name="Admin",
            user_email=admin_email,
            user_password=hashed_password.decode('utf-8'),
            is_admin=True 
        )

        self.db.add(admin_user)
        self.db.commit()
        self.db.refresh(admin_user)

        print("Administrador criado com sucesso!")
        return admin_user

    
    def find_user_by_id(self, id: int):
        return self.db.query(User).filter(User.user_id == id).first()

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

    def delete_user(self, user_id : int) :
        user = self.db.query(User).filter(User.user_id == user_id).first()
            
        self.db.delete(user)
        self.db.commit()   