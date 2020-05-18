import { UpdateClientInput } from '../../../types'
import { ClientDocument } from '../../../interfaces'
import { fetchAndUpdateClientWithUser } from '../../../helpers/ClientHelper'

export async function updateClient (
  { id, input }: { id: string, input: UpdateClientInput })
  : Promise<{ client: ClientDocument}> {
  const client = await fetchAndUpdateClientWithUser({ _id: id }, input)

  return { client }
}
