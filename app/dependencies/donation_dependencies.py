from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import get_db
from app.repositories.donation_repository import DonationRepository
from app.services.donation_service import DonationService

def get_donation_repository(db : Session = Depends(get_db)):
    return DonationRepository(db)

def get_donation_service(repository : DonationRepository = Depends(get_donation_repository)):
    return DonationService(repository)