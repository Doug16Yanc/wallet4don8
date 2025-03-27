from fastapi import HTTPException
from starlette import status

class UserNotFound(HTTPException):
    def __init__(self, detail: str = "Usuário não encontrado."):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)