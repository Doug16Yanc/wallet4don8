from typing import List, Optional
from pydantic import BaseModel
from enum import Enum

class CauseResponse(BaseModel):
    cause_id : int | None = None
    cause_name : str 
    description : str
    certification_code : str
    amount : float
    status_amount : str
    img_url : str
    fk_user_id : int
    image_data: Optional[str] = None 

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class ListCauseResponse(BaseModel):
        status : str
        results : int
        causes : List[CauseResponse]

class CauseCreate(BaseModel):
    cause_id: int
    cause_name: str
    description: str
    certification_code: str
    amount: float
    status_amount: str
    fk_user: int
    image_data: Optional[str]

    class Config:
        orm_mode = True

class StatusAmountEnum(str, Enum):
    STORED = 'stored'
    APPLIED = 'applied'


class CauseUpdate(BaseModel):
    status_amount: StatusAmountEnum

    class Config:
        orm_mode = True