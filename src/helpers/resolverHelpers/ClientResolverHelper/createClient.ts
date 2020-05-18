import { createOneUserObject } from '../../../services/models/UserService'
import { createOneClientObject } from '../../../services/models/ClientService'
import { CreateClientInput } from '../../../types'
import {
  ClientDocument,
  ClientInterface,
  UserInterface
} from '../../../interfaces'
import { Role } from '../../../enums'
import { checkUserConflicts } from '../../UserHelper'

const createClientWithUser = async (clientData: Partial<ClientInterface>,
  userData: Partial<UserInterface>): Promise<ClientDocument> => {
  const userObject = createOneUserObject({
    doc: { ...userData, roles: [Role.Client] }
  })

  const clientObject = createOneClientObject({
    doc: { user: userObject._id, ...clientData }
  })

  const [client, user] = await Promise.all([
    clientObject.save(),
    userObject.save()
  ])

  client.user = user

  return client
}

export async function createClient (input: CreateClientInput)
: Promise<{ client: ClientDocument }> {
  const { ...userData } = input

  const user = { ...userData }

  await checkUserConflicts(user)

  const client = await createClientWithUser({ }, user)

  return { client }
}
