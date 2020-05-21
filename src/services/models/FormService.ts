import Form from '../../models/Form'
import Question from '../../models/Question'
import Response from '../../models/Response'
import {
  createOne,
  fetchOneWithPopulate,
  updateOne,
  deleteOne,
  checkInUse,
  listPaginatedWithPopulate
} from '../../utils/mongoose'
import {
  FORMS_EMPTY_LIST,
  FORM_NOT_FOUND,
  FORM_IN_USE
} from '../../middlewares/errorHandling/errors'

const populate = { path: 'client', populate: { path: 'user' } }

export const createOneForm = createOne(Form)

export const fetchOneFormWithClient = fetchOneWithPopulate(
  Form, FORM_NOT_FOUND, populate)

export const updateOneForm = updateOne(Form, FORM_NOT_FOUND)

export const deleteOneForm = deleteOne(Form, FORM_NOT_FOUND)

export const checkFormInUse = checkInUse(
  [
    { Model: Question, fieldName: 'form' },
    { Model: Response, fieldName: 'form' }
  ], FORM_IN_USE
)

export const listFormsWithClientPaginated = listPaginatedWithPopulate(Form,
  FORMS_EMPTY_LIST, [populate, { path: 'numResponses' }])
