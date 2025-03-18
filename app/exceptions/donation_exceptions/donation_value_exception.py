from fastapi import HTTPException
from starlette import status

class DonationValueException(HTTPException):
    def __init__(self, detail: str = "Doação não pode ser realizada com valor nulo ou negativo."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)