from fastapi import HTTPException
from starlette import status

class DonationDenied(HTTPException):
    def __init__(self, detail: str = "Causa com montante já aplicado."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

