from sqlalchemy.orm import Session
from app.repositories.donation_repository import DonationRepository
from app.repositories.cause_repository import CauseRepository
from app.schemas import donation_schema
from app.exceptions.donation_exceptions import (
    donation_value_exception,
    donations_list_empty,
    donation_not_cause,
    donation_not_found,
    donation_denied
)

class DonationService:
    def __init__(self, repository: DonationRepository, cause_repository : CauseRepository):
        self.repository = repository
        self.cause_repository = cause_repository

    def create_donation(self, donation: donation_schema.DonationCreate):
        if donation.value <= 0:
            raise donation_value_exception.DonationValueException()
                
        cause = self.cause_repository.find_cause_by_id(donation.fk_cause)
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
    
    def find_donations_by_user(self, user_id: int):
        donations = self.repository.find_donations_by_user(user_id)

        if not donations:
            raise donations_list_empty.DonationListEmpty()
        
        return donations
    
    def update_donation(self, donation_id: int, new_amount: float):
        if new_amount <= 0.0:
            raise donation_value_exception.DonationValueException()

        donation = self.find_donation_by_id(donation_id)
        cause = self.cause_repository.find_cause_by_id(donation.fk_cause)  

        if not cause:
            raise donation_not_cause.DonationNotCause()

        if cause.status_amount == "applied":
            raise donation_denied.DonationDenied()
        
        current_donation_value_brl = self.convert_ether_in_brl(donation.value)
        new_amount_brl = self.convert_ether_in_brl(new_amount)

        donation.value = new_amount  
        
        cause.amount += (new_amount_brl - current_donation_value_brl)

        self.repository.update_donation(donation_id, new_amount)
        
        return donation 
    

    def find_all_donations(self):
        donations = self.repository.find_all_donations()

        if not donations:
            raise donations_list_empty.DonationListEmpty()

        return donations

    def delete_donation(self, id: int):
        donation_found = self.find_donation_by_id(id)

        if not donation_found:
            raise donation_not_found.DonationNotFound()
        
        return self.repository.delete_donation(id)

    def convert_ether_in_brl(self, value: float):
        return value * 10799.18
