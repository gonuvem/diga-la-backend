import { FormDocument } from '../../../interfaces'
import { fetchOneFormWithClient } from '../../../services/models/FormService'

export async function showForm ({ id }: { id: string }):
Promise<{ form: FormDocument }> {
  const form = await fetchOneFormWithClient({ conditions: { _id: id } })

  return { form }
}
