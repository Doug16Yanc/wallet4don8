from app.repositories.user_repository import UserRepository
from app.schemas import user_schema
from app.exceptions.user_exceptions import user_already_exists

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user: user_schema.UserCreate):
        existing_user = self.repository.find_user_by_email(user.email)

        if existing_user:
            raise user_already_exists.UserAlreadyExists()
        
        return self.repository.create_user(user)

