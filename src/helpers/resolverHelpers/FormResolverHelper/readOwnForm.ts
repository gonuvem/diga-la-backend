import { UserDocument, FormDocument } from '../../../interfaces'
import { fetchOneFormWithClient } from '../../../services/models/FormService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function readOwnForm (user: UserDocument, { id }: { id: string }):
Promise<{ form: FormDocument }> {
  const client = await fetchOneClientWithUser({
    conditions: { user: user._id }
  })

  const form = await fetchOneFormWithClient({
    conditions: { _id: id, client: client._id }
  })

  return { form }
}
