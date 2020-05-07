import { Document } from 'mongoose'

import { QuestionTypeAlias, QuestionTypeKind } from '../../enums'

export interface QuestionTypeInterface {
  kind: QuestionTypeKind,
  alias: QuestionTypeAlias,
  name: string,
  cover: string,
  description: string
}

export interface QuestionTypeDocument extends QuestionTypeInterface, Document {}
