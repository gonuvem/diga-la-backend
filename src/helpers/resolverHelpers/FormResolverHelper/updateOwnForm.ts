import { FormDocument, UserDocument } from '../../../interfaces'
import { UpdateOwnFormInput } from '../../../types'
import { fetchOneClient } from '../../../services/models/ClientService'
import {
  fetchOneForm,
  updateOneForm
} from '../../../services/models/FormService'

export async function updateOwnForm (user: UserDocument, { id, input }:
   { id: string, input: UpdateOwnFormInput }): Promise<{ form: FormDocument }> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  const form = await fetchOneForm({
    conditions: { _id: id, client: client._id }
  })

  const formUpdated = await updateOneForm({
    conditions: { _id: form._id },
    updateData: input
  })

  return { form: formUpdated }
}
