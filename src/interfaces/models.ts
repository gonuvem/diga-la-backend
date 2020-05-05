import { Document } from 'mongoose'

import { Role } from '../enums'

export interface UserInterface {
  /** Nome completo */
  name: string,
  email: string,
  roles: Role[]
}

export interface UserDocument extends UserInterface, Document {}
