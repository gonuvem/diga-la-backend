import { Query } from 'mongoose'

import { ClientDocument, UserDocument } from '../../../interfaces'
import { fetchOneUserWithoutError } from '../../../services/models/UserService'

export function getClientUser (client: ClientDocument)
: Query<UserDocument> {
  return fetchOneUserWithoutError({ conditions: { _id: client.user } })
}
