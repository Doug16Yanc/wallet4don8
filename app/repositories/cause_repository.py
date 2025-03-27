from sqlalchemy.orm import Session
from app.schemas import cause_schema
from app.models.cause import Cause
import base64

class CauseRepository:

    def __init__(self, db: Session):
        self.db = db

    def find_all_causes(self):

        causes = self.db.query(Cause).all()

        return causes

    def find_cause_by_id(self, cause_id: int):
        return self.db.query(Cause).filter(Cause.cause_id == cause_id).first()

    def find_cause_by_name(self, cause_name: str):
        return self.db.query(Cause).filter(Cause.cause_name == cause_name).first()

    def create_cause(self, cause: cause_schema.CauseCreate):
        try:
            new_cause = Cause(
                cause_name=cause.cause_name,
                description=cause.description,
                certification_code=cause.certification_code,
                amount=cause.amount,
                status_amount=cause.status_amount,
                fk_user=cause.fk_user,
                image_data=cause.image_data
            )
            self.db.add(new_cause)
            self.db.commit()
            self.db.refresh(new_cause)
            return cause_schema.CauseResponse.from_orm(new_cause)
        except Exception as e:
            self.db.rollback()
            raise e

    def update_cause_status(self, id: int, new_status: str):
        cause = self.find_cause_by_id(id)
    
        if not cause:
            return None
        
        cause.status_amount = new_status
        self.db.commit() 
        self.db.refresh(cause) 

        return cause

    def delete_cause(self, id: int):
        try:
            cause = self.db.query(Cause).filter(Cause.cause_id == id).first()
            if cause:
                self.db.delete(cause)
                self.db.commit()
                return cause_schema.CauseResponse.from_orm(cause)
            return None
        except Exception as e:
            self.db.rollback()
            raise e
