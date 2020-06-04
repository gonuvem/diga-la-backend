import { UserDocument, ClientDocument } from '../../../interfaces'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function readOwnProfile (user : UserDocument)
: Promise<{ client: ClientDocument }> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  return { client }
}
