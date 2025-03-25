from fastapi import HTTPException
from starlette import status

class IsNotAdmin(HTTPException):
    def __init__(self, detail: str = "Permissões de administrador negadas!"):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)