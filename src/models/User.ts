import mongoose from 'mongoose'

import { UserDocument } from '../interfaces'
import { Role } from '../enums'

const UserSchema = new mongoose.Schema({
  /** Nome completo */
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  roles: [
    {
      type: String,
      enum: Object.values(Role),
      required: true
    }
  ]
}, { timestamps: true })

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
