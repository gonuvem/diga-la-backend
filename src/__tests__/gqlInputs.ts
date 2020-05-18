import {
  UpdateOwnProfileInput,
  CreateClientInput,
  UpdateClientInput
} from '../types'

export const createInputUpdateOwnProfile = (input: UpdateOwnProfileInput)
: string => `{
  name: "${input.name}",
  email: "${input.email}"
}`

export const createInputCreateClient = (input: CreateClientInput): string => `{
  name: "${input.name}",
  email: "${input.email}",
  password: "${input.password}"
}`

export const createInputUpdateClient = (input: UpdateClientInput): string => `{
  name: "${input.name}",
  email: "${input.email}"
}`
