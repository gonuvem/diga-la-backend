import Joi from '@hapi/joi'

import {
  idSchema,
  basicStringSchema,
  dateSchema,
  booleanSchema,
  integerSchema
} from '../baseSchemas'

export const FormConfig = {
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

export const FormStyle = {
  background: basicStringSchema,
  logo: basicStringSchema,
  headerText: basicStringSchema,
  hasLogoInHeader: booleanSchema,
  headerBackground: basicStringSchema,
  footerText: basicStringSchema,
  footerBackground: basicStringSchema
}

export const Form = {
  client: idSchema,
  isActive: booleanSchema,
  config: Joi.object(FormConfig),
  style: Joi.object(FormStyle)
}
