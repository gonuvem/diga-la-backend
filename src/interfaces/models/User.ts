import { Document } from 'mongoose'

import { Role } from 'src/enums'

export interface UserInterface {
  /** Nome completo */
  name: string,
  email: string,
  password: string,
  roles: Role[],
  renewPasswordCode?: string
}

export interface UserDocument extends UserInterface, Document {}
