import { Document, Types } from 'mongoose'

import { UserDocument } from './User'

export interface ClientInterface {
  user: Partial<UserDocument> | Types.ObjectId
}

export interface ClientDocument extends ClientInterface, Document {}
