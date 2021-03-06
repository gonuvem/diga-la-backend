import { FormDocument, UserDocument } from '../../../interfaces'
import { CreateOwnFormInput } from '../../../types'
import { fetchOneClient } from '../../../services/models/ClientService'
import { createOneForm } from '../../../services/models/FormService'

export async function createOwnForm (user: UserDocument,
  input: CreateOwnFormInput): Promise<{ form: FormDocument }> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  const form = await createOneForm({ doc: { client: client._id, ...input } })

  return { form }
}
