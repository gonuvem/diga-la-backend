import { UserInterface, FormInterface } from '../interfaces'

export type LoginParams = {
  email: UserInterface['email'],
  password: UserInterface['password']
}

export type ValidateTokenParams = {
  token: string
}

export type ForgotPasswordParams = {
  email: UserInterface['email']
}

export type RenewPasswordParams = {
  email: UserInterface['email'],
  password: UserInterface['password'],
  code: UserInterface['renewPasswordCode']
}

export type UpdateOwnProfileInput = {
  name: UserInterface['name'],
  email: UserInterface['email']
}

export type UpdateOwnPasswordParams = {
  oldPassword: UserInterface['password'],
  newPassword: UserInterface['password']
}

export type CreateClientInput = {
  name: UserInterface['name'],
  email: UserInterface['email'],
  password: UserInterface['password'],
}

export type UpdateClientInput = {
  name: UserInterface['name'],
  email: UserInterface['email']
}

type ListParams = {
  q?: string,
  page?: number,
  perPage?: number,
  sort?: string,
}

export type ListClientsParams = ListParams & { filters?: object }

export type CreateOwnFormInput = {
  isActive: FormInterface['isActive'],
  config: FormInterface['config'],
  style?: FormInterface['style']
}

export type UpdateOwnFormInput = {
  isActive?: FormInterface['isActive'],
  config?: FormInterface['config'],
  style?: FormInterface['style']
}

export type ListOwnFormsParams = ListParams & { filters?: object }
