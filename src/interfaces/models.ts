import { Document } from 'mongoose'

export interface UserInterface {
  /** Nome completo */
  name: string,
}

export interface UserDocument extends UserInterface, Document {}
