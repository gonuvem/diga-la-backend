import { UserDocument } from '../../../interfaces'
import { UpdateOwnPasswordParams } from '../../../types'
import { fetchOneUser } from '../../../services/models/UserService'
import { checkIfPasswordIsCorrect } from '../../UserHelper'

export async function updateOwnPassword (user: UserDocument,
  { oldPassword, newPassword }: UpdateOwnPasswordParams)
  : Promise<{ user: UserDocument }> {
  const userObj = await fetchOneUser({
    conditions: { _id: user._id },
    lean: false
  })

  await checkIfPasswordIsCorrect(userObj, oldPassword)

  userObj.password = newPassword

  const userUpdated = await userObj.save()

  return { user: userUpdated }
}
