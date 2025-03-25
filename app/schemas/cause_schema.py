from typing import List, Optional
from pydantic import BaseModel
from enum import Enum

class CauseResponse(BaseModel):
    cause_name: str
    description: str
    certification_code: str
    amount: float
    status_amount: str
    img_data: Optional[bytes] 
    fk_user_id: int  
    
    class Config:
        from_attributes = True  
        allow_population_by_field_name = True
        arbitrary_types_allowed = True


class ListCauseResponse(BaseModel):
    status: str
    results: int
    causes: List[CauseResponse]


class CauseCreate(BaseModel):
    cause_name: str
    description: str
    certification_code: str
    amount: float
    status_amount: str
    fk_user: int
    image_data: Optional[bytes] = None

    class Config:
        from_attributes = True  


class StatusAmountEnum(str, Enum):
    STORED = 'stored'
    APPLIED = 'applied'


class CauseUpdate(BaseModel):
    status_amount: StatusAmountEnum

    class Config:
        from_attributes = True 
