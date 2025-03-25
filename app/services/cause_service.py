from app.repositories.cause_repository import CauseRepository
from app.schemas import cause_schema
import base64
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

    def _validate_and_process_image(self, image_data: bytes) -> str:
        if not image_data:
            return None

        try:
            if image_data.startswith(b'data:image'):
                image_data = image_data.split(b',')[1]

            decoded_image = base64.b64decode(image_data)

            max_image_size = 5 * 1024 * 1024  # 5MB
            if len(decoded_image) > max_image_size:
                raise ValueError("Imagem muito grande. Limite máximo: 5MB")

            encoded_image = base64.b64encode(decoded_image).decode('utf-8')

            return encoded_image

        except Exception as e:
            raise ValueError(f"Erro ao processar imagem: {str(e)}")

    def create_cause(self, cause: cause_schema.CauseCreate):
        try:
            existing_cause = self.find_cause_by_name(cause.cause_name)
            if existing_cause:
                raise cause_already_exists.CauseAlreadyExists()
        except cause_not_found.CauseNotFound:
            pass

        processed_image = self._validate_and_process_image(cause.image_data)

        cause_dict = cause.dict()
        cause_dict['image_data'] = processed_image

        return self.repository.create_cause(cause_schema.CauseCreate(**cause_dict))
    
    def find_cause_by_id(self, id: int):
        cause_found = self.repository.find_cause_by_id(self, id)
        return cause_found

    def find_cause_by_name(self, name: str):
        cause_found = self.repository.find_cause_by_name(name)
        return cause_found

    def find_all_causes(self):
        causes = self.repository.find_all_causes()

        if not causes:
            raise causes_list_empty.CausesListEmpty()

        return causes

    def update_cause_by_id(self, id: int):
        cause = self.find_cause_by_id(id)

        if cause.amount == 0.0:
            raise cause_amount_empty.CauseAmountEmpty()

        return self.repository.update_cause(id, new_amount)

    def delete_cause_by_name(self, name: str):
        cause = self.find_cause_by_name(name)

        if cause.status_amount == "stored":
            raise cause_deletion_exception.CauseDeletionException()

        return self.repository.delete_cause_by_name(name)
