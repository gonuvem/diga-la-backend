import { UserDocument, FormDocument } from '../../../interfaces'
import { fetchOneForm } from '../../../services/models/FormService'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function readOwnForm (user: UserDocument, { id }: { id: string }):
Promise<{ form: FormDocument }> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  const form = await fetchOneForm({
    conditions: { _id: id, client: client._id }
  })

  return { form }
}
