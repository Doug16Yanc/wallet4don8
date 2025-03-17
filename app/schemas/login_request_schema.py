from pydantic import BaseModel

class LoginRequest(BaseModel):
    user_email : str
    user_password : str