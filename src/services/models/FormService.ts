import Form from '../../models/Form'
import Question from '../../models/Question'
import Response from '../../models/Response'
import {
  createOne,
  fetchOne,
  updateOne,
  deleteOne,
  checkInUse,
  listPaginated,
  fetchOneWithoutError
} from '../../utils/mongoose'
import {
  FORMS_EMPTY_LIST,
  FORM_NOT_FOUND,
  FORM_IN_USE
} from '../../middlewares/errorHandling/errors'

export const createOneForm = createOne(Form)

export const fetchOneForm = fetchOne(
  Form, FORM_NOT_FOUND)

export const updateOneForm = updateOne(Form, FORM_NOT_FOUND)

export const deleteOneForm = deleteOne(Form, FORM_NOT_FOUND)

export const checkFormInUse = checkInUse(
  [
    { Model: Question, fieldName: 'form' },
    { Model: Response, fieldName: 'form' }
  ], FORM_IN_USE
)

export const listFormsPaginated = listPaginated(Form, FORMS_EMPTY_LIST)

export const fetchOneFormWithoutError = fetchOneWithoutError(Form)
