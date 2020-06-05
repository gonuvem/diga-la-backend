import { Document } from 'mongoose'

import { ID } from '../../types'
import { UserDocument } from './User'

export interface ClientInterface {
  user: Partial<UserDocument> | ID
}

export interface ClientDocument extends ClientInterface, Document {}
