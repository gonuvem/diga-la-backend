import { UserDocument, ClientDocument } from '../../../interfaces'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function readOwnProfile (user : UserDocument)
: Promise<{ client: ClientDocument }> {
  const client = await fetchOneClientWithUser({
    conditions: { user: user._id }
  })

  return { client }
}
