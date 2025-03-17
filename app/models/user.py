from database import Base
from sqlalchemy import Column, String, Integer, Float, ForeignKey, LargeBinary


class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String, nullable=False)
    user_email = Column(String, nullable=False)
    user_password = Column(String, nullable=False)
