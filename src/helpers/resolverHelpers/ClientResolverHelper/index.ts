import { Query } from 'mongoose'

import { ClientDocument, UserDocument } from '../../../interfaces'
import { fetchOneUserWithoutError } from '../../../services/models/UserService'

export * from './createClient'
export * from './updateClient'
export * from './deleteClient'
export * from './listClients'
export * from './readClient'

export function getClientUser (client: ClientDocument)
: Query<UserDocument> {
  return fetchOneUserWithoutError({ conditions: { _id: client.user } })
}
