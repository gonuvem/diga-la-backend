import mongoose, { Document } from 'mongoose'

import Factory from '../factories'
import * as jwt from '../middlewares/authentication/jwt'
import { Role } from '../enums'
import User from '../models/User'
import Client from '../models/Client'
import Form from '../models/Form'
import {
  UserDocument,
  ClientDocument,
  UserInterface,
  FormDocument
} from '../interfaces'

function mapModelNameToModel (modelName: string): mongoose.Model<any> {
  switch (modelName) {
    case 'User': return User
    case 'Client': return Client
    case 'Form': return Form
  }
}

export function buildFactories<T> (name: string, body: Partial<T>, size = 1): unknown {
  return size > 1
    ? Factory.buildList(name, size, body)
    : Factory.build<T>(name, body)
}

export function createObject<T extends Document> ({ modelName }:
   { modelName: string }) {
  return function (
    { body = {}, size = 1 }: { body?: Partial<T>, size?: number })
    : Promise<T> {
    const Model: mongoose.Model<T> = mapModelNameToModel(modelName)

    return Model.create(buildFactories<T>(modelName, body, size))
  }
}

export async function dropCollection ({ modelName }
  : { modelName: string }): Promise<void> {
  const Model = mapModelNameToModel(modelName)

  await Model.deleteMany({})
}

export const dropCollections = async (modelsNames: string[]): Promise<void> => {
  for (const modelName of modelsNames) {
    await dropCollection({ modelName })
  }
}

export const getToken = (user: UserDocument): Promise<string> => {
  return jwt.sign({ _id: user._id })
}

type RolesSplitted = {
  rolesAllowed: Array<Role>,
  rolesNotAllowed: Array<string>
}

export const splitRolesByPermission = (rolesAllowed: Array<Role>)
: RolesSplitted => {
  const xrolesNotAllowed = Object.values(Role)
    .filter((role) => !rolesAllowed.includes(role))

  const rolesNotAllowed = [...xrolesNotAllowed, 'noRole']

  return { rolesAllowed, rolesNotAllowed }
}

/**
 * Create Models
 */

export const createUser = createObject<UserDocument>({ modelName: 'User' })

export const createClient = createObject<ClientDocument>({ modelName: 'Client' })

export const createForm = createObject<FormDocument>({ modelName: 'Form' })

export const createClientUserAndToken = async (userBody = {}, clientBody = {})
: Promise<{ user: UserDocument, token: string, client: ClientDocument }> => {
  const user = await createUser({ body: { ...userBody, roles: [Role.Client] } })

  const [token, client] = await Promise.all([
    getToken(user),
    createClient({ body: { ...clientBody, user: user._id } })
  ])

  return { user, token, client }
}

type SetupData = {
  fact: UserInterface,
  token: string,
  user: UserDocument
}

export type SetupTaskResult = { [role in Role]: SetupData }
& { [s: string]: SetupData }

const createSetupData = (factory: UserInterface, token: string,
  user: UserDocument): SetupData => {
  return { fact: factory, token: token, user: user }
}

export const setupTask = async (): Promise<SetupTaskResult> => {
  const roles = [[], [Role.Dev], [Role.Client]]
  const createUserFact = (body: object): UserInterface =>
    Factory.build<UserInterface>('User', body)

  const factories = roles.map(role => createUserFact({ roles: role }))

  const users = await Promise
    .all(factories.map(async fact => createUser({ body: fact })))

  const tokens = await Promise.all(users.map(getToken))

  return {
    noRole: createSetupData(factories[0], tokens[0], users[0]),
    [Role.Dev]: createSetupData(factories[1], tokens[1], users[1]),
    [Role.Client]: createSetupData(factories[2], tokens[2], users[2])
  }
}
