import { Document } from 'mongoose'

import { ClientDocument } from './Client'

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
  client: ClientDocument,
  isActive: boolean,
  config: FormConfig,
  style: FormStyle
}

export interface FormDocument extends FormInterface, Document {}
