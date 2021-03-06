import { ID } from '../types'
import {
  UserDocument,
  ClientDocument,
  ClientInterface,
  UserInterface
} from '../interfaces'
import {
  updateOneClient,
  fetchOneClient
} from '../services/models/ClientService'
import {
  updateOneUser,
  checkUserConflicts
} from '../services/models/UserService'

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

  const client = await fetchOneClient({ conditions })

  if (userData.email) {
    await checkUserConflicts(userData, client.user as ID)
  }

  return updateClientWithUser(client, { }, userData)
}
