
from fastapi import HTTPException
from starlette import status

class CauseNotFound(HTTPException):
    def __init__(self, detail: str = "Causa não encontrada no sistema."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)