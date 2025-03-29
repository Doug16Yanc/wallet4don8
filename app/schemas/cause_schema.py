from typing import List, Optional
from pydantic import BaseModel, field_serializer
from enum import Enum
import base64

class CauseResponse(BaseModel):
    cause_name: str
    description: str
    certification_code: str
    amount: float
    status_amount: str
    image_data: Optional[str] 
    fk_user: int  


    @field_serializer('image_data')
    def serialize_image(self, image_data: Optional[bytes], _info):
        try:
            if image_data is None:
                return None
            if isinstance(image_data, str):
                return f"data:image/jpeg;base64,{image_data}"
            return f"data:image/jpeg;base64,{base64.b64encode(image_data).decode('utf-8')}"
        except Exception as e:
            print(f"Erro ao serializar a imagem: {e}")
            return None 
        
        class Config:
            from_attributes = True
            json_encoders = {
                bytes: lambda v: base64.b64encode(v).decode('utf-8')
            }
    
    """
    @field_serializer('image_data')
    def serialize_image(self, image_data: Optional[bytes], _info):
        if image_data is None:
            return None
        return f"data:image/jpeg;base64,{base64.b64encode(image_data).decode('utf-8')}"
    
   
        """

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
