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
  name: basicStringSchema.required(),
  description: basicStringSchema.optional(),
  beginDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
  hasLimitedResponses: booleanSchema.optional(),
  maxResponses: integerSchema.min(1).optional(),
  isTotemMode: booleanSchema.optional(),
  canDisplayProgressBar: booleanSchema.optional(),
  progressBarType: basicStringSchema.optional(),
  canAllowMultipleSubmissions: booleanSchema.optional()
}

export const FormStyleSchema: JoiSchemaMap<FormStyle> = {
  background: basicStringSchema.optional(),
  logo: urlSchema.optional(),
  headerText: basicStringSchema.optional(),
  hasLogoInHeader: booleanSchema.optional(),
  headerBackground: basicStringSchema.optional(),
  footerText: basicStringSchema.optional(),
  footerBackground: basicStringSchema.optional()
}

export const Form: JoiSchemaMap<FormInterface> = {
  client: idSchema,
  isActive: booleanSchema,
  config: Joi.object(FormConfigSchema),
  style: Joi.object(FormStyleSchema)
}
