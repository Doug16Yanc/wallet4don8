from database.database import Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

class Donation(Base) :
    __tablename__ = 'donations'
    donation_id = Column(Integer, primary_key=True)
    address_account = Column(String, nullable=False) 
    value = Column(Float, nullable=False)
    fk_cause = Column(Integer, ForeignKey('causes.cause_id'), nullable=False)
    cause = relationship('Cause', backref='donations')
    fk_user = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    user = relationship('User', backref='donations')