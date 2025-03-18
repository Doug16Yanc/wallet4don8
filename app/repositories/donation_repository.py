from sqlalchemy.orm import Session
from app import models, schemas
from app.models import Donation

class DonationRepository:

    @staticmethod
    def create_donation(db : Session, donation : schemas.DonationCreate):
        new_donation = models.Donation(
            address_account = donation.address_account,
            value = donation.value,
            fk_cause = donation.fk_cause,
            fk_user = donation.fk_user
        )
        db.add(new_donation)
        db.commit()
        db.refresh()

    @staticmethod
    def find_donation_by_id(db : Session, id : int):
        return db.query(models.Donation).filter(Donation.id == id).first()

    @staticmethod
    def find_all_donations(db : Session):
        return db.query(models.Donation).all()


    @staticmethod
    def delete_donation_by_id(db : Session, id : int):
        return db.query(models.Donation).filter(Donation.id == id).delete()
