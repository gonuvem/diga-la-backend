import { UserDocument, ResponseDocument } from '../../../interfaces'
import {
  fetchOneResponseWithForm
} from '../../../services/models/ResponseService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function readOwnResponse (user: UserDocument, { id }: { id: string }):
Promise<{ response: ResponseDocument }> {
  await fetchOneClientWithUser({ conditions: { user: user._id } })

  const response = await fetchOneResponseWithForm({
    conditions: { _id: id }
  })

  return { response }
}
