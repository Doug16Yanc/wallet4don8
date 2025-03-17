from fastapi import HTTPException
from starlette import status

class UserAlreadyExistsError(HTTPException):
    def __init__(self, detail: str = "Usuário já cadastrado com este email."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)