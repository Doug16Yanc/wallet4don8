from fastapi import HTTPException
from starlette import status

class BadCredentials(HTTPException):
    def __init__(self, detail: str = "Credenciais não reconhecidas."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)