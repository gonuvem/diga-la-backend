import mongoose from 'mongoose'

import { UserDocument } from '../interfaces'

const UserSchema = new mongoose.Schema({
  /** Nome completo */
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
