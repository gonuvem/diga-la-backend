import {
  UserDocument,
  ClientDocument,
  ClientInterface,
  UserInterface
} from '../../../interfaces'
import { UpdateOwnProfileInput } from '../../../types'
import {
  fetchOneClientWithUser,
  updateOneClient
} from '../../../services/models/ClientService'
import {
  fetchOneUserWithoutError,
  updateOneUser
} from '../../../services/models/UserService'
import { EMAIL_CONFLICT } from '../../../middlewares/errorHandling/errors'

const updateClientWithUser = async (client: ClientDocument,
  clientData: Partial<ClientInterface>, userData: Partial<UserInterface>)
  : Promise<ClientDocument> => {
  const [clientUpdated, user] = await Promise.all([
    updateOneClient({
      conditions: { _id: client._id },
      updateData: clientData
    }),
    updateOneUser({
      conditions: { _id: (client.user as UserDocument)._id },
      updateData: userData
    })
  ])

  clientUpdated.user = user

  return clientUpdated
}

const checkUserConflicts = async (user: Partial<UserDocument>,
  query = {}): Promise<void> => {
  const { email } = user

  const [userWithSameEmail] = await Promise.all([
    fetchOneUserWithoutError({ conditions: { email, ...query } })
  ])

  if (userWithSameEmail) throw EMAIL_CONFLICT
}

export async function updateOwnProfile (user: UserDocument,
  input: UpdateOwnProfileInput): Promise<{ client: ClientDocument }> {
  const { ...userData } = input

  const client = await fetchOneClientWithUser({ conditions: { user: user._id } })

  if (userData.email) {
    const query = { _id: { $ne: (client.user as UserDocument)._id } }
    await checkUserConflicts(userData, query)
  }

  const clientUpdated = await updateClientWithUser(client, { }, userData)

  return { client: clientUpdated }
}
