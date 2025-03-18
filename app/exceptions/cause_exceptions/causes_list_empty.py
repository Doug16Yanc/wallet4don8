from fastapi import HTTPException
from starlette import status

class CausesListEmpty(HTTPException):
    def __init__(self, detail: str = "Nenhuma causa registrada."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)