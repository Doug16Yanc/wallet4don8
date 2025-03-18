from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.donation_service import DonationService
import schemas

router = APIRouter()

@router.post("/create-donation", response_model=schemas.DonationResponse)
def create_donation(donation: schemas.CreateDonation, db: Session = Depends(get_db)):

    donation = DonationService.create_donation(db, donation)

    return {"status": "success", "message" : "Doação criada com sucesso!", "donation": donation}

@router.get("/get-donation/{donation_id}")
def get_donation_by_id(db : Session, id : int):

    donation = DonationService.find_donation_by_id(db, id)

    return {"status": "success", "message" : "Doação encontrada com sucesso!", "donation": donation}

@router.get("/get-all-donations", response_model=list[schemas.DonationResponse])
def get_all_donations(db: Session = Depends(get_db)):

    donations = DonationService.get_all_donations(db)

    return {"status": "success", "message" : "Doações encontradas com sucesso!", "donations": donations}


@router.delete("/delete-donation/{donation_id}", response_model=[schemas.DonationResponse])
def delete_donation_by_id(db : Session, id : int):

    donation = DonationService.delete_donation_by_id(db, id)

    return {"status": "success", "message" : "Doação deletada com sucesso!", "donation": donation}

