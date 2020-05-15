import mongoose from 'mongoose'

import { ClientDocument, ClientInterface } from '../interfaces'
import { MongooseDefinition } from '../types'
import './User'

const definition: MongooseDefinition<ClientInterface> = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}

const ClientSchema = new mongoose.Schema(definition, { timestamps: true })

const Client = mongoose.model<ClientDocument>('Client', ClientSchema)

export default Client
