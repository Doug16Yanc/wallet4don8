from sqlalchemy.orm import Session
from app import models, schemas
from app.models import Cause

class CauseRepository: 

    @staticmethod
    def create_cause(db : Session, cause : schemas.CauseCreate): 
        new_cause = models.Cause(
            cause_name=cause.cause_name,
            description=cause.description,
            certification_code=cause.certification_code,
            amount=cause.amount,
            status_amount=cause.status_amount,
            fk_user=cause.fk_user,
            image_data=cause.image_data 
            )
        db.add(new_cause)
        db.commit()
        db.refresh(new_cause)
    
    @staticmethod
    def find_cause_by_name(db : Session, name : str):
        return db.query(models.Cause).filter(models.Cause.cause_name == name).first()

    @staticmethod
    def find_all_causes(db : Session):
        return db.query(models.Cause).all()
    
    @staticmethod
    def update_cause_by_name(db : Session, name : str, new_amount : float):
        return db.query(models.Cause).filter(Cause.cause_name == name).update({"amount": new_amount})


    @staticmethod
    def delete_cause_by_name(db : Session, name : str):
        return db.query(models.Cause).filter(Cause.cause_name == name).delete()