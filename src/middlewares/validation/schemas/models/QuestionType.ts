import { QuestionTypeAlias, QuestionTypeKind } from '../../../../enums'
import { stringEnumSchema, basicStringSchema, urlSchema } from '../baseSchemas'

export const QuestionType = {
  kind: stringEnumSchema(QuestionTypeKind),
  alias: stringEnumSchema(QuestionTypeAlias),
  name: basicStringSchema,
  cover: urlSchema,
  description: basicStringSchema
}
