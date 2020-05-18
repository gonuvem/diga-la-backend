export const errorFieldsQuery = `{
  message
  statusCode
  internalCode
  internalError {
    name
    message
    stack
  }
}`

export const userFieldsQuery = `{
  _id
  name
  email
  roles
}`

export const clientFieldsQuery = `{
  _id
  user ${userFieldsQuery}
  createdAt
  updatedAt
}`
