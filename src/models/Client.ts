import mongoose from 'mongoose'

import { ClientDocument } from '../interfaces'
import './User'

const ClientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

const Client = mongoose.model<ClientDocument>('Client', ClientSchema)

export default Client
