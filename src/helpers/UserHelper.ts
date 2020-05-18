import bcrypt from 'bcrypt'

import {
  PASSWORD_INCORRECT,
  EMAIL_CONFLICT
} from '../middlewares/errorHandling/errors'
import { UserDocument } from '../interfaces'
import { fetchOneUserWithoutError } from '../services/models/UserService'

const comparePassword = (
  encryptedPassword: string, candidatePassword: string): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, encryptedPassword)
}

export const checkIfPasswordIsCorrect = async (
  user: UserDocument, passwordToCheck: string): Promise<void> => {
  const isEqual = await comparePassword(user.password, passwordToCheck)

  if (!isEqual) throw PASSWORD_INCORRECT
}

export const checkUserConflicts = async (user: Partial<UserDocument>,
  query = {}): Promise<void> => {
  const { email } = user

  const [userWithSameEmail] = await Promise.all([
    fetchOneUserWithoutError({ conditions: { email, ...query } })
  ])

  if (userWithSameEmail) throw EMAIL_CONFLICT
}
