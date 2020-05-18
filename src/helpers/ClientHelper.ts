import {
  UserDocument,
  ClientDocument,
  ClientInterface,
  UserInterface
} from '../interfaces'
import {
  updateOneClient,
  fetchOneClientWithUser
} from '../services/models/ClientService'
import { updateOneUser } from '../services/models/UserService'
import { checkUserConflicts } from './UserHelper'

export const updateClientWithUser = async (client: ClientDocument,
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

export const fetchAndUpdateClientWithUser = async (conditions: object,
  updateData: Partial<ClientInterface & UserInterface>)
  : Promise<ClientDocument> => {
  const { ...userData } = updateData

  const client = await fetchOneClientWithUser({ conditions })

  if (userData.email) {
    const query = { _id: { $ne: (client.user as UserDocument)._id } }
    await checkUserConflicts(userData, query)
  }

  return updateClientWithUser(client, { }, userData)
}
