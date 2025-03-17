from typing import List
from pydantic import BaseModel

from sqlalchemy import LargeBinary


class UserResponse(BaseModel):
    user_name : str
    user_email : str
    user_password : str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class ListUserResponse(BaseModel):
    status : str
    result : int
    users : List[UserResponse]

class UserCreate(BaseModel):
    user_id : int
    user_name: str
    user_email: str
    user_password: str

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    user_password : str

    class Config:
        orm_mode = True
