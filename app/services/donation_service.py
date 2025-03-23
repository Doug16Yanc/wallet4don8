from sqlalchemy.orm import Session
from app.repositories.donation_repository import DonationRepository
from app.services.cause_service import CauseService
from app.schemas import donation_schema
from app.exceptions.donation_exceptions import (
    donation_value_exception,
    donations_list_empty,
    donation_not_cause,
    donation_not_found
)

class DonationService:
    def __init__(self, repository: DonationRepository):
        self.repository = repository

    def create_donation(self, donation: donation_schema.DonationCreate):
        if donation.value <= 0:
            raise donation_value_exception.DonationValueException()

        cause = CauseService.find_cause_by_name(donation.cause_name)
        if not cause:
            raise donation_not_cause.DonationNotCause()
        
        donation_in_brl = self.convert_ether_in_brl(donation.value)

        cause.amount += donation_in_brl
        
        return self.repository.create_donation( donation)
    
    def find_donation_by_id(self, id: int):
        donation = self.repository.find_donation_by_id(id)

        if not donation:
            raise donation_not_found.DonationNotFound()
        
        return donation

    def get_all_donations(self):
        donations = self.repository.find_all_donations()

        if not donations:
            raise donations_list_empty.DonationListEmpty()

        return donations

    def delete_donation_by_id(self, id: int):
        donation_found = self.find_donation_by_id(id)

        if not donation_found:
            raise donation_not_found.DonationNotFound()
        
        return self.repository.delete_donation_by_id(id)

    def convert_ether_in_brl(self, value: float):
        return value * 10799.18
