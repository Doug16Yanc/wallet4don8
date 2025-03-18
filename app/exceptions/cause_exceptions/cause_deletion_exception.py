from fastapi import HTTPException
from starlette import status

class CauseDeletionException(HTTPException):
    def __init__(self, detail: str = "Causa não pode ser deletada."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)