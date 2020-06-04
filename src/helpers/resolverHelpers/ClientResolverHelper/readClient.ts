import { ClientDocument } from '../../../interfaces'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function readClient ({ id }: { id: string })
: Promise<{ client: ClientDocument }> {
  const client = await fetchOneClient({ conditions: { _id: id } })

  return { client }
}
