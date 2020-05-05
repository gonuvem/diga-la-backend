import { Document } from 'mongoose'

import { Role } from '../enums'

export interface UserInterface {
  /** Nome completo */
  name: string,
  /** Papéis */
  roles: Role[]
}

export interface UserDocument extends UserInterface, Document {}
