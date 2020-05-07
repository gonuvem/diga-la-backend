import { Document } from 'mongoose'

import { UserDocument } from './User'

export interface ClientInterface {
  user: UserDocument
}

export interface ClientDocument extends ClientInterface, Document {}
