import { UserDocument, ClientDocument } from '../../../interfaces'
import { UpdateOwnProfileInput } from '../../../types'
import { fetchAndUpdateClientWithUser } from '../../ClientHelper'

export async function updateOwnProfile (user: UserDocument,
  input: UpdateOwnProfileInput): Promise<{ client: ClientDocument }> {
  const client = await fetchAndUpdateClientWithUser({ user: user._id }, input)

  return { client }
}
