import { UserDocument } from '../../../interfaces'
import { ListOwnFormsParams, ListFormsResponse } from '../../../types'
import { listFormsWithClientPaginated } from '../../../services/models/FormService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function listOwnForms (user: UserDocument,
  { sort, page, perPage }: ListOwnFormsParams): Promise<ListFormsResponse> {
  const client = await fetchOneClientWithUser({
    conditions: { user: user._id }
  })

  const conditions = { client: client._id }

  const { objects: forms, total, pages } = await listFormsWithClientPaginated(
    { conditions, page, perPage, sort })

  return { forms, total, pages }
}
