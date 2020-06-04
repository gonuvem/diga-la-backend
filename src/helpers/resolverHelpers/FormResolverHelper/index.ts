import { Query } from 'mongoose'

import { ClientDocument, FormDocument } from '../../../interfaces'
import {
  fetchOneClientWithoutError
} from '../../../services/models/ClientService'
import {
  countResponsesByCriteria
} from '../../../services/models/ResponseService'

export * from './createOwnForm'
export * from './updateOwnForm'
export * from './deleteOwnForm'
export * from './listOwnForms'
export * from './readOwnForm'
export * from './showForm'

export function getFormClient (form: FormDocument): Query<ClientDocument> {
  return fetchOneClientWithoutError({ conditions: { _id: form.client } })
}

export function getFormNumResponses (form: FormDocument): Query<number> {
  return countResponsesByCriteria({ criteria: { form: form._id } })
}
