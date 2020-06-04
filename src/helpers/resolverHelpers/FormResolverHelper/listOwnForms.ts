import { UserDocument } from '../../../interfaces'
import { ListOwnFormsParams, ListFormsResponse } from '../../../types'
import { listFormsPaginated } from '../../../services/models/FormService'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function listOwnForms (user: UserDocument,
  { sort, page, perPage }: ListOwnFormsParams): Promise<ListFormsResponse> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  const conditions = { client: client._id }

  const { objects: forms, total, pages } = await listFormsPaginated(
    { conditions, page, perPage, sort })

  return { forms, total, pages }
}
