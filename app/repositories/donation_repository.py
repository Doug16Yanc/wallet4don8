from sqlalchemy.orm import Session
from app.schemas import donation_schema
from app.models.donation import Donation

class DonationRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_donation(self, donation: donation_schema.DonationCreate):
        try:
            new_donation = Donation(
                address_account=donation.address_account,
                value=donation.value,
                fk_cause=donation.fk_cause,
                fk_user=donation.fk_user
            )
            self.db.add(new_donation)
            self.db.commit()
            self.db.refresh(new_donation)
            return donation_schema.DonationResponse.from_orm(new_donation)
        except Exception as e:
            self.db.rollback()
            raise e

    def find_donation_by_id(self, id: int):
        return self.db.query(Donation).filter(Donation.id == id).first()
    
    def update_donation(self, id : int, new_amount : float): 

        donation = self.db.query(Donation).filter(Donation.id == id).first()
        donation.value = new_amount
        self.db.commit()
        self.db.refresh(donation)
        
        return donation

    def find_all_donations(self):
        donations = self.db.query(Donation).all()
        return [donation_schema.DonationResponse.from_orm(donation) for donation in donations]

    def delete_donation(self, id: int):
        try:
            donation = self.db.query(Donation).filter(Donation.id == id).first()
            if donation:
                self.db.delete(donation)
                self.db.commit()
                return donation_schema.DonationResponse.from_orm(donation)
            return None
        except Exception as e:
            self.db.rollback()
            raise e
