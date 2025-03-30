from fastapi import APIRouter, Depends, status, Response
from app.schemas import cause_schema
from app.services.cause_service import CauseService
from app.dependencies.cause_dependencies import get_cause_service

router = APIRouter(prefix="/causes", tags=["Causes"])

@router.get("/get_causes")
def get_all_causes(service: CauseService = Depends(get_cause_service)):
    causes = service.find_all_causes()
    return {"status": "success", "message": "Causas encontradas com sucesso!", "causes": causes}

@router.post("/create_cause", status_code=status.HTTP_201_CREATED)
def create_cause(
    payload: cause_schema.CauseCreate,
    service: CauseService = Depends(get_cause_service)
):
    new_cause = service.create_cause(payload)
    return new_cause
   
@router.get("/cause/{cause_name}")
def find_cause_by_name(
    cause_name: str,
    service: CauseService = Depends(get_cause_service)
):
    cause = service.find_cause_by_name(cause_name)
    return {"status": "success", "message": "Causa encontrada com sucesso!", "cause": cause}
   

@router.patch("/update_cause/{cause_id}")
def update_cause_by_id(
    cause_id : int,
    service: CauseService = Depends(get_cause_service)
):
    updated_cause = service.update_cause_by_id(cause_id)
    return {"status": "success", "message": "Montante atualizado com sucesso!", "cause": updated_cause}
   

@router.delete("/delete_cause/{cause_id}")
def delete_cause(
    cause_id: int,
    service: CauseService = Depends(get_cause_service)
):
    
    service.delete_cause(cause_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
        
