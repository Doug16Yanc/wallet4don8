from typing import List
from pydantic import BaseModel

class UserResponse(BaseModel):
    user_name: str
    user_email: str
    is_admin : bool
    
    class Config:
        from_attributes = True  
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class ListUserResponse(BaseModel):
    status: str
    result: int
    users: List[UserResponse]

class UserCreate(BaseModel):
    user_name: str
    user_email: str
    user_password: str  
    is_admin : bool

    class Config:
        from_attributes = True  

class UserUpdate(BaseModel):
    user_email : str
    user_password: str

    class Config:
        from_attributes = True  
