import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { UserDocument } from '../interfaces'
import { Role } from '../enums'

import { SALT_WORK_FACTOR } from '../utils/constants'

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
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      type: String,
      enum: Object.values(Role),
      required: true
    }
  ],
  renewPasswordCode: {
    type: String,
    default: ''
  }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save (next) {
  const user = this as UserDocument
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, function (err: mongoose.Error, hash) {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
