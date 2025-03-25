from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import get_db
from app.repositories.donation_repository import DonationRepository
from app.repositories.cause_repository import CauseRepository
from app.services.donation_service import DonationService

def get_donation_repository(db: Session = Depends(get_db)):
    return DonationRepository(db)

def get_cause_repository(db: Session = Depends(get_db)):
    return CauseRepository(db)

def get_donation_service(
    donation_repository: DonationRepository = Depends(get_donation_repository),
    cause_repository: CauseRepository = Depends(get_cause_repository)
):
    return DonationService(donation_repository, cause_repository)
