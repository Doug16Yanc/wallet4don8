from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.cause_service import CauseService
import schemas

router = APIRouter()

@router.post("/create-cause", response_model=schemas.CauseResponse)
def create_cause(cause: schemas.CreateCause, db: Session = Depends(get_db)):

    cause = CauseService.create_donation(db, cause)

    return {"status": "success", "message" : "Causa criada com sucesso!", "cause": cause}


@router.get("/cause/{cause_name}", response_model=schemas.CauseResponse)
def find_cause_by_id(db: Session, cause_name : str):

    cause = CauseService.find_cause_by_name(db, cause_name)

    return {"status": "success", "message" : "Causa encontrada com sucesso!", "cause": cause}

@router.get("/causes", response_model=list[schemas.CauseResponse])
def get_all_causes(db: Session = Depends(get_db)):

    causes = CauseService.get_all_causes(db)

    return {"status": "success", "message" : "Causas encontradas com sucesso!", "causes": causes}

@router.patch("/update-cause-by-name/{cause_name}", response_model=schemas.CauseResponse)
def update_cause_by_name(db: Session, cause_name : str, new_amount : float):

    cause_updated = CauseService.update_cause_by_name(db, cause_name, new_amount)

    return {"status": "success", "message" : "Status de montante atualizado com sucesso!", "cause": cause_updated}

@router.delete("/cause/{cause_id}")
def delete_cause_by_id(db : Session, id : int):
    
    cause_deleted = CauseService.delete_cause_by_id(db, id)

    return {"status": "success", "message" : "Causa deletada com sucesso!", "cause": cause_deleted}