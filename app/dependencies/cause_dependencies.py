from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import get_db
from app.repositories.cause_repository import CauseRepository
from app.services.cause_service import CauseService

def get_cause_repository(db : Session = Depends(get_db)):
    return CauseRepository(db)

def get_cause_service(repository : CauseRepository = Depends(get_cause_repository)):
    return CauseService(repository)