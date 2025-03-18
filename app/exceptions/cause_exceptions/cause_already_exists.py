from fastapi import HTTPException
from starlette import status

class CauseAlreadyExistsError(HTTPException):
    def __init__(self, detail: str = "Causa já cadastrada no sistema."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)