from app.repositories.auth_repository import AuthRepository
from app.schemas import login_request_schema
from app.utils.security import verify_password, create_access_token
from app.exceptions.user_exceptions import bad_credentials, user_not_found, is_not_admin

class AuthService:

    def __init__(self, repository: AuthRepository):
        self.repository = repository
    
    def authenticate_user(self, login_data: login_request_schema.LoginRequest):
        user = self.repository.get_user_by_email(login_data.user_email)
        
        if not user:
            raise user_not_found.UserNotFound()
        
        if not verify_password(login_data.user_password, user.user_password):
            raise bad_credentials.BadCredentials()
            

        if login_data.is_admin and not user.is_admin:
            raise is_not_admin.IsNotAdmin()
    
    
        access_token = create_access_token(data={
            "sub": user.user_email, 
            "is_admin": user.is_admin
        })
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.user_id,
            "user_name": user.user_name,
            "is_admin": user.is_admin
        }