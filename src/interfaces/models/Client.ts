import { Document } from 'mongoose'

import { UserDocument } from './User'

export interface ClientInterface {
  user: Partial<UserDocument>
}

export interface ClientDocument extends ClientInterface, Document {}
