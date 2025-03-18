from fastapi import HTTPException
from starlette import status

class DonationNotCause(HTTPException):
    def __init__(self, detail: str = "Causa não encontrada para esta doação."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)