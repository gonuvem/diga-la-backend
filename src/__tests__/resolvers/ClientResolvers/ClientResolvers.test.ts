import createClientTest from './createClientTest'
import updateClientTest from './updateClientTest'
import deleteClientTest from './deleteClientTest'
import listClientsTest from './listClientsTest'

describe('Test Client Resolvers', () => {
  describe('Test createClient', createClientTest)

  describe('Test updateClient', updateClientTest)

  describe('Test deleteClient', deleteClientTest)

  describe('Test listClients', listClientsTest)
})
