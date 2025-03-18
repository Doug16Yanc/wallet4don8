from sqlalchemy.orm import Session
from repositories.donation_repository import DonationRepository
from services.cause_service import CauseService
import schemas
from app.exceptions import (
    DonationValueException,
    DonationListEmpty,
    DonationNotCause,
    DonationNotFound
    )

class DonationService:

    @staticmethod
    def create_donation(db: Session, donation: schemas.CreateDonation):

        if donation.value <= 0:
            raise DonationValueException()

        cause = CauseService.find_cause_by_name(db, donation.cause_name)
        if not cause:
            raise DonationNotCause()
        
        donation_in_brl = DonationService.convert_ether_in_brl(donation.value)

        cause.amount += donation_in_brl
        db.commit()
        
        return DonationRepository.create_donation(db, donation)
    
    @staticmethod
    def find_donation_by_id(db: Session, id : int):
        donation = DonationRepository.find_donation_by_id(db, id)

        if not donation:
            raise DonationNotFound()
        
        return donation

    @staticmethod
    def get_all_donations(db: Session):
        donations = DonationRepository.find_all_donations(db)

        if not donations:
            raise DonationListEmpty()

        return donations
    

    @staticmethod
    def delete_donation_by_id(db: Session, id : int):
        donation_found = DonationService.find_donation_by_id(db, id)

        if not donation_found:
            raise DonationNotFound()
        
        return DonationRepository.delete_donation_by_id(db, id)
    
    @staticmethod
    def convert_ether_in_brl(value : float):
        return value * 10799.18