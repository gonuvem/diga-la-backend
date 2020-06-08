import { Query } from 'mongoose'

import { FormDocument } from '../../../interfaces'
import {
  countResponsesByCriteria
} from '../../../services/models/ResponseService'

export function getFormNumResponses (form: FormDocument): Query<number> {
  return countResponsesByCriteria({ criteria: { form: form._id } })
}
