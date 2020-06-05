import { Document } from 'mongoose'

import { ID } from '../../types'
import { ClientDocument } from './Client'
import { Timestamps } from '../general'

export interface FormConfig {
  name: string,
  description?: string,
  beginDate?: Date,
  endDate?: Date,
  hasLimitedResponses: boolean,
  maxResponses?: number,
  isTotemMode: boolean,
  canDisplayProgressBar: boolean,
  progressBarType?: string,
  canAllowMultipleSubmissions: boolean
}

export interface FormStyle {
  background?: string,
  logo?: string,
  headerText?: string,
  hasLogoInHeader: boolean,
  headerBackground?: string,
  footerText?: string,
  footerBackground?: string
}

export interface FormInterface {
  client: Partial<ClientDocument> | ID
  isActive: boolean,
  config: FormConfig,
  style: FormStyle,
  numResponses?: number
}

export interface FormDocument extends FormInterface, Document, Timestamps {}
