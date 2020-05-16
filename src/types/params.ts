import { UserInterface } from '../interfaces'

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
