import { Document, Types } from 'mongoose'

import { QuestionDocument } from './Question'
import { FormDocument } from './Form'
import { QuestionTypeAlias } from '../../enums'

interface Answer {
  [QuestionTypeAlias.CheckBox]?: Types.ObjectId[] | string[],
  [QuestionTypeAlias.Date]?: Date[],
  [QuestionTypeAlias.DropDown]?: Types.ObjectId[] | string[],
  [QuestionTypeAlias.Email]?: string,
  [QuestionTypeAlias.ImageChoice]?: Types.ObjectId[] | string[],
  [QuestionTypeAlias.Link]?: string,
  [QuestionTypeAlias.LongText]?: string,
  [QuestionTypeAlias.Matrix]?: Types.ObjectId[] | string[],
  [QuestionTypeAlias.NPS]?: number,
  [QuestionTypeAlias.Number]?: number,
  [QuestionTypeAlias.Phone]?: string,
  [QuestionTypeAlias.RadioButton]?: Types.ObjectId[] | string[],
  [QuestionTypeAlias.ShortText]?: string,
  [QuestionTypeAlias.Slider]?: number,
  [QuestionTypeAlias.SortList]?: Types.ObjectId[] | string[]
}

export interface AnswerAndQuestion {
  question: QuestionDocument | Types.ObjectId,
  answer: Answer
}

export interface ResponseInterface {
  form: Partial<FormDocument> | Types.ObjectId,
  answersAndQuestions: AnswerAndQuestion[]
}

export interface ResponseDocument extends ResponseInterface, Document {}
