import { UpdateOwnProfileInput } from '../types'

export const createInputUpdateOwnProfile = (input: UpdateOwnProfileInput)
: string => `{
  name: "${input.name}",
  email: "${input.email}"
}`
