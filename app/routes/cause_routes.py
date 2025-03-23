from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.exc import IntegrityError
from app.schemas import cause_schema
from app.services.cause_service import CauseService
from app.dependencies.cause_dependencies import get_cause_service

router = APIRouter()

@router.get("/causes")
def get_all_causes(service: CauseService = Depends(get_cause_service)):
    try:
        causes = service.get_all_causes()
        return {"status": "success", "message": "Causas encontradas com sucesso!", "causes": causes}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )


@router.post("/cause", status_code=status.HTTP_201_CREATED)
def create_cause(
    payload: cause_schema.CauseCreate,
    service: CauseService = Depends(get_cause_service)
):
    try:
        new_cause = service.create_cause(payload)
        return {"status": "success", "message": "Causa criada com sucesso!", "cause": new_cause}
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


@router.get("/cause/{cause_name}")
def find_cause_by_name(
    cause_name: str,
    service: CauseService = Depends(get_cause_service)
):
    try:
        cause = service.find_cause_by_name(cause_name)
        return {"status": "success", "message": "Causa encontrada com sucesso!", "cause": cause}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )


@router.patch("/cause/{cause_name}")
def update_cause_by_name(
    cause_name: str,
    new_amount: float,
    service: CauseService = Depends(get_cause_service)
):
    try:
        updated_cause = service.update_cause_by_name(cause_name, new_amount)
        return {"status": "success", "message": "Montante atualizado com sucesso!", "cause": updated_cause}
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erro de integridade nos dados. Verifique os valores enviados."
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )


@router.delete("/cause/{cause_id}")
def delete_cause(
    cause_id: int,
    service: CauseService = Depends(get_cause_service)
):
    try:
        service.delete_cause(cause_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro inesperado: {e}"
        )
