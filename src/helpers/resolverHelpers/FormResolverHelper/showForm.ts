import { FormDocument } from '../../../interfaces'
import { fetchOneForm } from '../../../services/models/FormService'

export async function showForm ({ id }: { id: string }):
Promise<{ form: FormDocument }> {
  const form = await fetchOneForm({ conditions: { _id: id } })

  return { form }
}
