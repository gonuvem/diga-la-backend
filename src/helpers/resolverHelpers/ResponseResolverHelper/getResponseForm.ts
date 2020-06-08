import { Query } from 'mongoose'

import { FormDocument, ResponseDocument } from '../../../interfaces'
import { fetchOneFormWithoutError } from '../../../services/models/FormService'

export function getResponseForm (response: ResponseDocument):
Query<FormDocument> {
  return fetchOneFormWithoutError({ conditions: { _id: response.form } })
}
