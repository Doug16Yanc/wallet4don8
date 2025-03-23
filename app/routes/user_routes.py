from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from app.schemas import user_schema
from app.services.user_service import UserService
from app.dependencies.user_dependencies import get_user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=user_schema.UserResponse)
def create_user(
    payload: user_schema.UserCreate,
    service: UserService = Depends(get_user_service)
):
    try:
        new_user = service.create_user(payload)
        return {"status": "success", "message": "Usuário criado com sucesso!", "user": new_user}
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erro de integridade nos dados. Verifique os valores enviados."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )
