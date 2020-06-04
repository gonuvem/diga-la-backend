import { UserDocument } from '../../../interfaces'
import {
  fetchOneForm,
  checkFormInUse,
  deleteOneForm
} from '../../../services/models/FormService'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function deleteOwnForm (user: UserDocument, { id }:{ id: string }):
 Promise<{}> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  const form = await fetchOneForm({
    conditions: { _id: id, client: client._id }
  })

  await checkFormInUse({ id: form._id })

  await deleteOneForm({ conditions: { _id: form._id } })

  return {}
}
