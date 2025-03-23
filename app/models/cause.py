from database.database import Base
from sqlalchemy import Column, Integer, Float, ForeignKey, String, LargeBinary
from sqlalchemy.orm import relationship
from . status_amount import Status_Amount

class Cause(Base):
    __tablename__ = 'causes'
    cause_id = Column(Integer, primary_key=True)
    cause_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    certification_code = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    status_amount = Column(String, default=Status_Amount.STORED)
    fk_user = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    user = relationship('User', backref='causes')
    image_data = Column(LargeBinary, nullable=True)