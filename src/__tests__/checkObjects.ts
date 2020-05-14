import { UserInterface, UserDocument } from '../interfaces'
import { Role } from '../enums'

export const checkUser = (expected: Partial<UserInterface>,
  received: Partial<UserDocument>)
: void => {
  expect(received).toMatchObject({
    name: expected.name,
    email: expected.email
  })

  received.roles.forEach((role: Role, i: number) => {
    expect(role).toBe(expected.roles[i])
  })
}
