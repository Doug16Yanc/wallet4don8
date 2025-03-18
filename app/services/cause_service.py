from sqlalchemy.orm import Session
from repositories.cause_repository import CauseRepository
import schemas
from exceptions.cause_exceptions import (
    CauseAlreadyExists, 
    CausesListEmpty, 
    CauseNotFound, 
    CauseAmountEmpty, 
    CauseDeletionException)


class CauseService:

    @staticmethod
    def create_cause(db : Session, cause : schemas.CauseCreate):

        existing_cause = CauseService.find_cause_by_name(db, cause.cause_name)

        if existing_cause:
            raise CauseAlreadyExists()

        return CauseRepository.create_cause(db, cause)

    
    @staticmethod
    def find_cause_by_name(db : Session, name : str):
      cause_found = CauseRepository.find_cause_by_name(db, name)

      if not cause_found:
          raise CauseNotFound()
      
      return cause_found

    @staticmethod
    def find_all_causes(db : Session):
        causes = CauseRepository.find_all_causes(db)

        if not causes:
            raise CausesListEmpty()
        
        return causes
    
    @staticmethod
    def update_cause_by_name(db : Session, name : str, new_amount : float):
        
        cause = CauseService.find_cause_by_name(db, name)

        if cause.amount == 0.0:
            raise CauseAmountEmpty()
        
        return CauseRepository.update_cause_by_name(db, name, new_amount)

    @staticmethod
    def delete_cause_by_name(db : Session, name : str):
        
        cause = CauseService.find_cause_by_name(db, name)

        if cause.status_amount == "stored":
            raise CauseDeletionException()
        
        return CauseRepository.delete_cause_by_name(db, name)