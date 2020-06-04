import {
  fetchOneClient,
  checkClientInUse,
  deleteOneClient
} from '../../../services/models/ClientService'
import { deleteOneUser } from '../../../services/models/UserService'
import { UserDocument } from '../../../interfaces'

export async function deleteClient ({ id }: { id: string }): Promise<object> {
  const client = await fetchOneClient({ conditions: { _id: id } })

  await checkClientInUse({ id: client._id })

  await Promise.all([
    deleteOneClient({ conditions: { _id: client._id } }),
    deleteOneUser({ conditions: { _id: (client.user as UserDocument)._id } })
  ])

  return { }
}
