import {
  UserDocument,
  ClientDocument,
  FormDocument,
  QuestionTypeDocument,
  QuestionDocument,
  ResponseDocument
} from '../interfaces'

type BasicUser = {
  _id: UserDocument['_id']
  name: UserDocument['name']
  email: UserDocument['email']
  roles: UserDocument['roles']
}

export type UserRoleInfo = {
  _id?: string
  user: BasicUser
}

export type LoginResponse = {
  token: string,
  info: UserRoleInfo
}

type ListResponse = {
  total: number,
  pages: number
}

export type ListClientsResponse = ListResponse & { clients: ClientDocument[] }

export type ListFormsResponse = ListResponse & { forms: FormDocument[] }

export type ListQuestionTypesResponse = ListResponse &
{ types: QuestionTypeDocument[] }

export type ListQuestionsResponse = ListResponse &
{ questions: QuestionDocument[] }

export type ListResponsesResponse = ListResponse &
{ responses: ResponseDocument[] }
