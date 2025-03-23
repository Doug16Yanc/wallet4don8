from sqlalchemy.orm import Session
from app.schemas import cause_schema
from app.models.cause import Cause

class CauseRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Cause).all()

    def get_by_name(self, cause_name: str):
        return self.db.query(Cause).filter(Cause.cause_name == cause_name).first()

    def create(self, cause: cause_schema.CauseCreate):
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

    def update(self, cause_name: str, update_data: dict):
        try:
            cause_query = self.db.query(Cause).filter(Cause.cause_name == cause_name)
            cause = cause_query.first()
            if not cause:
                return None
            cause_query.update(update_data, synchronize_session=False)
            self.db.commit()
            self.db.refresh(cause)
            return cause_schema.CauseResponse.from_orm(cause)
        except Exception as e:
            self.db.rollback()
            raise e

    def delete(self, cause_name: str):
        try:
            cause = self.db.query(Cause).filter(Cause.cause_name == cause_name).first()
            if cause:
                self.db.delete(cause)
                self.db.commit()
                return cause_schema.CauseResponse.from_orm(cause)
            return None
        except Exception as e:
            self.db.rollback()
            raise e
