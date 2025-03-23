from app.repositories.cause_repository import CauseRepository
from app.schemas import cause_schema
from app.exceptions.cause_exceptions import (
    cause_already_exists,
    causes_list_empty,
    cause_not_found,
    cause_amount_empty,
    cause_deletion_exception
)

class CauseService:

    def __init__(self, repository: CauseRepository):
        self.repository = repository

    def create_cause(self, cause: cause_schema.CauseCreate):
        existing_cause = self.find_cause_by_name(cause.cause_name)

        if existing_cause:
            raise cause_already_exists.CauseAlreadyExists()

        return self.repository.create_cause(cause)

    def find_cause_by_name(self, name: str):
        cause_found = self.repository.find_cause_by_name(name)

        if not cause_found:
            raise cause_not_found.CauseNotFound()

        return cause_found

    def find_all_causes(self):
        causes = self.repository.find_all_causes()

        if not causes:
            raise causes_list_empty.CausesListEmpty()

        return causes

    def update_cause_by_name(self, name: str, new_amount: float):
        cause = self.find_cause_by_name(name)

        if cause.amount == 0.0:
            raise cause_amount_empty.CauseAmountEmpty()

        return self.repository.update_cause_by_name(name, new_amount)

    def delete_cause_by_name(self, name: str):
        cause = self.find_cause_by_name(name)

        if cause.status_amount == "stored":
            raise cause_deletion_exception.CauseDeletionException()

        return self.repository.delete_cause_by_name(name)
