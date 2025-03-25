from fastapi import APIRouter, Depends, status
from app.schemas import user_schema
from app.services.user_service import UserService
from app.dependencies.user_dependencies import get_user_service
from app.services.auth_services import AuthService
from app.dependencies.auth_dependencies import get_auth_service
from app.schemas import login_request_schema

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/create_user", status_code=status.HTTP_201_CREATED, response_model=user_schema.UserResponse)
def create_user(payload: user_schema.UserCreate, service: UserService = Depends(get_user_service)):
    new_user = service.create_user(payload)
    return new_user
    
@router.post("/login", status_code=status.HTTP_200_OK)
def login(payload: login_request_schema.LoginRequest, service: AuthService = Depends(get_auth_service)):
    auth_data = service.authenticate_user(payload)

    return auth_data

@router.patch("/update_password", response_model=dict)
def update_password(payload: user_schema.UserUpdate, service: UserService = Depends(get_user_service)):
    result = service.change_password(payload.user_email, payload.user_password)

    return result