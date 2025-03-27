from fastapi import HTTPException
from starlette import status

class CausesListEmpty(HTTPException):
    def __init__(self, detail: str = "Nenhuma causa registrada."):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)