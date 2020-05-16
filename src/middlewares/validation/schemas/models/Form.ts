import Joi from '@hapi/joi'

import {
  idSchema,
  basicStringSchema,
  dateSchema,
  booleanSchema,
  integerSchema,
  urlSchema
} from '../baseSchemas'
import { JoiSchemaMap } from '../../../../types'
import { FormConfig, FormStyle, FormInterface } from '../../../../interfaces'

export const FormConfigSchema: JoiSchemaMap<FormConfig> = {
  name: basicStringSchema,
  description: basicStringSchema,
  beginDate: dateSchema,
  endDate: dateSchema,
  hasLimitedResponses: booleanSchema,
  maxResponses: integerSchema.min(1),
  isTotemMode: booleanSchema,
  canDisplayProgressBar: booleanSchema,
  progressBarType: basicStringSchema,
  canAllowMultipleSubmissions: booleanSchema
}

export const FormStyleSchema: JoiSchemaMap<FormStyle> = {
  background: basicStringSchema,
  logo: urlSchema,
  headerText: basicStringSchema,
  hasLogoInHeader: booleanSchema,
  headerBackground: basicStringSchema,
  footerText: basicStringSchema,
  footerBackground: basicStringSchema
}

export const Form: JoiSchemaMap<FormInterface> = {
  client: idSchema,
  isActive: booleanSchema,
  config: Joi.object(FormConfigSchema),
  style: Joi.object(FormStyleSchema)
}
