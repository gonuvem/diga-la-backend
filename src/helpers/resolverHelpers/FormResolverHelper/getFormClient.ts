import { Query } from 'mongoose'

import { ClientDocument, FormDocument } from '../../../interfaces'
import {
  fetchOneClientWithoutError
} from '../../../services/models/ClientService'

export function getFormClient (form: FormDocument): Query<ClientDocument> {
  return fetchOneClientWithoutError({ conditions: { _id: form.client } })
}
