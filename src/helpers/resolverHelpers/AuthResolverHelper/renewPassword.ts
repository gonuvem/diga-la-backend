import { RenewPasswordParams } from '../../../types'
import { UserDocument } from '../../../interfaces'
import { fetchOneUser } from '../../../services/models/UserService'
import {
  WRONG_RENEW_PASSWORD_CODE
} from '../../../middlewares/errorHandling/errors'

const renewUserPassword = async (user: UserDocument, renewPasswordCode: string,
  newPassword: string) : Promise<void> => {
  if (user.renewPasswordCode !== renewPasswordCode) {
    throw WRONG_RENEW_PASSWORD_CODE
  }

  user.password = newPassword
  user.renewPasswordCode = ''

  await user.save()
}

export async function renewPassword (
  { email, password, code }: RenewPasswordParams): Promise<{}> {
  const user = await fetchOneUser({ conditions: { email }, lean: false })

  await renewUserPassword(user, code, password)

  return {}
}
