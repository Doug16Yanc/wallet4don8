from fastapi import HTTPException
from starlette import status

class DonationListEmpty(HTTPException):
    def __init__(self, detail: str = "Sem doações registradas no sistema."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)