from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.exc import IntegrityError
from app.schemas import donation_schema
from app.services.donation_service import DonationService
from app.dependencies.donation_dependencies import get_donation_service

router = APIRouter()


@router.post("/donation", status_code=status.HTTP_201_CREATED, response_model=donation_schema.DonationResponse)
def create_donation(
    payload: donation_schema.DonationCreate,
    service: DonationService = Depends(get_donation_service)
):
    try:
        new_donation = service.create_donation(payload)
        return {"status": "success", "message": "Doação criada com sucesso!", "donation": new_donation}
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erro de integridade nos dados. Verifique os valores enviados."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )


@router.get("/donation/{donation_id}", response_model=donation_schema.DonationResponse)
def get_donation_by_id(
    donation_id: int,
    service: DonationService = Depends(get_donation_service)
):
    try:
        donation = service.find_donation_by_id(donation_id)
        return {"status": "success", "message": "Doação encontrada com sucesso!", "donation": donation}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )


@router.get("/donations", response_model=list[donation_schema.DonationResponse])
def get_all_donations(service: DonationService = Depends(get_donation_service)):
    try:
        donations = service.get_all_donations()
        return {"status": "success", "message": "Doações encontradas com sucesso!", "donations": donations}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )


@router.delete("/donation/{donation_id}")
def delete_donation_by_id(
    donation_id: int,
    service: DonationService = Depends(get_donation_service)
):
    try:
        service.delete_donation_by_id(donation_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )
