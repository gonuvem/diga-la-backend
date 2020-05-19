import { Role } from '../../../enums'
import { ListClientsParams, ListClientsResponse } from '../../../types'
import {
  listClientsWithUserPaginated
} from '../../../services/models/ClientService'
import { fetchAllUsers } from '../../../services/models/UserService'
import { createSearchQuery } from '../../../utils/search'

const createListClientsConditions = async (userSearch: object, filter: object)
: Promise<object> => {
  const userConditions = { roles: [Role.Client], ...userSearch }

  const clientUsers = await fetchAllUsers({ conditions: userConditions })

  const clientsUserId = clientUsers.map(e => e._id)

  return { user: { $in: clientsUserId }, ...filter }
}

export async function listClients (
  { q, sort, page, perPage }: ListClientsParams): Promise<ListClientsResponse> {
  const userSearch = await createSearchQuery(['name', 'email'])(q)

  const conditions = await createListClientsConditions(userSearch, {})

  const { objects: clients, total, pages } = await listClientsWithUserPaginated(
    conditions, '', sort, page, perPage)

  return { clients, total, pages }
}
