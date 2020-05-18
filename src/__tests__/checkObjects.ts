import { Role } from '../enums'
import {
  UserInterface,
  UserDocument,
  ClientInterface,
  ClientDocument
} from '../interfaces'

export const checkUser = (expected: Partial<UserInterface>,
  received: Partial<UserDocument>): void => {
  expect(received).toMatchObject({
    name: expected.name,
    email: expected.email
  })

  received.roles.forEach((role: Role, i: number) => {
    expect(role).toBe(expected.roles[i])
  })
}

export const checkClient = (expected: Partial<ClientInterface>,
  received: Partial<ClientDocument>): void => {
  checkUser(expected.user as UserInterface, received.user as UserInterface)
}
