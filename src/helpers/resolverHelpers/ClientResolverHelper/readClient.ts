import { ClientDocument } from '../../../interfaces'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function readClient ({ id }: { id: string })
: Promise<{ client: ClientDocument }> {
  const client = await fetchOneClientWithUser({ conditions: { _id: id } })

  return { client }
}
