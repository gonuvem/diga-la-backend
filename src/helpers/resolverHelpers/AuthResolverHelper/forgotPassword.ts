import { ForgotPasswordParams } from '../../../types'
import {
  fetchOneUser,
  updateOneUser
} from '../../../services/models/UserService'
import { UserDocument } from '../../../interfaces'
import { generateRandomString } from '../../../utils/general'
import { sendRenewPasswordEmail } from '../../../services/mail'

const generateRenewPasswordCode = async (user: UserDocument)
: Promise<UserDocument> => {
  const alphabet = '1234567890abcdefABCDEF'
  const codeLength = 5

  const renewPasswordCode = await generateRandomString(alphabet, codeLength)

  return updateOneUser({
    conditions: { _id: user._id },
    updateData: { renewPasswordCode }
  })
}

export async function forgotPassword ({ email }: ForgotPasswordParams):
 Promise<{}> {
  const user = await fetchOneUser({ conditions: { email } })

  const userWithCode = await generateRenewPasswordCode(user)

  await sendRenewPasswordEmail(userWithCode)

  return {}
}
