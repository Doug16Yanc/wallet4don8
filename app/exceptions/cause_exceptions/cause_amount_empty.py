from fastapi import HTTPException
from starlette import status

class CauseAmountEmpty(HTTPException):
    def __init__(self, detail: str = "Causa não pode ser atualizada até que tenha pelo menos uma doação."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)