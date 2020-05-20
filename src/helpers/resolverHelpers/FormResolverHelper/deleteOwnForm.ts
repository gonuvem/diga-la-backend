import { UserDocument } from '../../../interfaces'
import {
  fetchOneFormWithClient,
  checkFormInUse,
  deleteOneForm
} from '../../../services/models/FormService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function deleteOwnForm (user: UserDocument, { id }:{ id: string }):
 Promise<{}> {
  const client = await fetchOneClientWithUser({
    conditions: { user: user._id }
  })

  const form = await fetchOneFormWithClient({
    conditions: { _id: id, client: client._id }
  })

  await checkFormInUse({ id: form._id })

  await deleteOneForm({ conditions: { _id: form._id } })

  return {}
}
