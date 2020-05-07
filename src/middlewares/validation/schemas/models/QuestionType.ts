import { QuestionTypeAlias, QuestionTypeKind } from '../../../../enums'
import { stringEnumSchema, basicStringSchema } from '../baseSchemas'

export const QuestionType = {
  kind: stringEnumSchema(QuestionTypeKind),
  alias: stringEnumSchema(QuestionTypeAlias),
  name: basicStringSchema,
  cover: basicStringSchema,
  description: basicStringSchema
}
