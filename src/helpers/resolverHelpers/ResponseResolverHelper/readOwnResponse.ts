import { UserDocument, ResponseDocument } from '../../../interfaces'
import { fetchOneResponse } from '../../../services/models/ResponseService'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function readOwnResponse (user: UserDocument,
  { id }: { id: string }): Promise<{ response: ResponseDocument }> {
  await fetchOneClient({ conditions: { user: user._id } })

  const response = await fetchOneResponse({ conditions: { _id: id } })

  return { response }
}
