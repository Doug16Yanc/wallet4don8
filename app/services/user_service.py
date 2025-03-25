from app.repositories.user_repository import UserRepository
from app.schemas import user_schema
from app.exceptions.user_exceptions import user_already_exists, user_not_found

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user: user_schema.UserCreate):
        existing_user = self.repository.find_user_by_email(user.user_email)

        if existing_user:
            raise user_already_exists.UserAlreadyExists()
        
        return self.repository.create_user(user)
    
    def change_password(self, email: str, new_password: str):
        user = self.repository.find_user_by_email(email)
        if not user:
            raise user_not_found.UserNotFound()

        success = self.repository.update_password(email, new_password)
        if success:
            return {"message": "Senha atualizada com sucesso!"}
        return {"error": "Erro ao atualizar a senha!"}

