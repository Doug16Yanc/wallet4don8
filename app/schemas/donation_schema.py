from typing import List
from pydantic import BaseModel

class DonationResponse(BaseModel):
    donation_id : int | None = None 
    address_account : str  
    value : float
    fk_cause : int
    fk_user : int
  
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class ListDonationResponse(BaseModel):
        status : str
        results : int
        causes : List[DonationResponse]

class DonationCreate(BaseModel):
    donation_id : int
    address_account : str 
    value: float
    fk_cause: int
    fk_user: int

    class Config:
        orm_mode = True