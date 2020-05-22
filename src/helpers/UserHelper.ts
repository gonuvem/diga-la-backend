import bcrypt from 'bcrypt'

import { PASSWORD_INCORRECT } from '../middlewares/errorHandling/errors'
import { UserDocument } from '../interfaces'

const comparePassword = (
  encryptedPassword: string, candidatePassword: string): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, encryptedPassword)
}

export const checkIfPasswordIsCorrect = async (
  user: UserDocument, passwordToCheck: string): Promise<void> => {
  const isEqual = await comparePassword(user.password, passwordToCheck)

  if (!isEqual) throw PASSWORD_INCORRECT
}
