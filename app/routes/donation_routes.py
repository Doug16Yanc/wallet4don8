from fastapi import APIRouter, Depends, status, Response
from app.schemas import donation_schema
from app.services.donation_service import DonationService
from app.dependencies.donation_dependencies import get_donation_service

router = APIRouter(prefix="/donations", tags=["Donations"])


@router.post("/create_donation", status_code=status.HTTP_201_CREATED, response_model=donation_schema.DonationResponse)
def create_donation(
    payload: donation_schema.DonationCreate,
    service: DonationService = Depends(get_donation_service)
):
    new_donation = service.create_donation(payload)
    return new_donation
     

@router.get("/donation/{donation_id}", response_model=donation_schema.DonationResponse)
def find_donation_by_id(
    donation_id: int,
    service: DonationService = Depends(get_donation_service)
):
    donation = service.find_donation_by_id(donation_id)
    return donation


@router.get("/get_donations/{user_id}", response_model=list[donation_schema.DonationResponse])
def find_user_donations(
    user_id: int,  
    service: DonationService = Depends(get_donation_service)
):
    donations = service.find_donations_by_user(user_id)
    
    return donations


@router.patch("/update_donation/{donation_id}", response_model=donation_schema.DonationUpdate)
def update_donation(
    donation_id: int,
    request: donation_schema.DonationUpdate,
    service: DonationService = Depends(get_donation_service)
):
    updated_donation = service.update_donation(donation_id, request.new_amount)
    
    return {"new_amount": updated_donation.value}

@router.get("/get_donations", response_model=list[donation_schema.DonationResponse])
def find_all_donations(service: DonationService = Depends(get_donation_service)):
    donations = service.find_all_donations()
    
    return donations


@router.delete("/delete_donation/{donation_id}")
def delete_donation(
    donation_id: int,
    service: DonationService = Depends(get_donation_service)
):
    service.delete_donation(donation_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
  
