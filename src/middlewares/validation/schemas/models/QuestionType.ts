import { QuestionTypeAlias, QuestionTypeKind } from '../../../../enums'
import { stringEnumSchema, basicStringSchema, urlSchema } from '../baseSchemas'
import { JoiSchemaMap } from '../../../../types'
import { QuestionTypeInterface } from '../../../../interfaces'

export const QuestionType: JoiSchemaMap<QuestionTypeInterface> = {
  kind: stringEnumSchema(QuestionTypeKind),
  alias: stringEnumSchema(QuestionTypeAlias),
  name: basicStringSchema,
  cover: urlSchema,
  description: basicStringSchema
}
