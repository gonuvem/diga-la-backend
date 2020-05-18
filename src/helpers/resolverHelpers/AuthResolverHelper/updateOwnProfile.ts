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
import { updateOneUser } from '../../../services/models/UserService'
import { checkUserConflicts } from '../../UserHelper'

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
