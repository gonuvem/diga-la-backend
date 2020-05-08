/* eslint-disable max-lines */
import mongoose from 'mongoose'

import { QuestionDocument } from '../interfaces'
import './Form'
import './QuestionType'

const NumberConfigSchema = new mongoose.Schema({
  hasMaxMinLimit: {
    type: Boolean,
    required: true,
    default: false
  },
  maxValue: {
    type: Number,
    validate: Number.isInteger
  },
  minValue: {
    type: Number,
    validate: Number.isInteger
  },
  incValue: {
    type: Number,
    validate: Number.isInteger
  }
}, { _id: false })

const AnswerOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  image: String
}, { _id: false })

const CheckBoxConfigSchema = new mongoose.Schema({
  hasHorizontalAlignment: {
    type: Boolean,
    required: true,
    default: false
  },
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false
  },
  answerOptions: [{
    type: AnswerOptionSchema,
    required: true
  }]
}, { _id: false })

const EmailConfigSchema = new mongoose.Schema({
  hasValidation: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false })

const PhoneConfigSchema = new mongoose.Schema({
  hasValidation: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false })

const LinkConfigSchema = new mongoose.Schema({
  hasValidation: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false })

const ImageChoiceConfigSchema = new mongoose.Schema({
  isMultipleChoice: {
    type: Boolean,
    required: true,
    default: false
  },
  maxChoices: {
    type: Number,
    validate: Number.isInteger
  },
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false
  },
  answerOptions: [{
    type: AnswerOptionSchema,
    required: true
  }]
}, { _id: false })

const ShortTextConfigSchema = new mongoose.Schema({
  placeholder: String,
  hasLimitedChars: {
    type: Boolean,
    required: true,
    default: false
  },
  maxChars: {
    type: Number,
    validate: Number.isInteger
  }
}, { _id: false })

const NPSConfigSchema = new mongoose.Schema({
  canDisplayLabels: {
    type: Boolean,
    required: true,
    default: false
  },
  leftLabel: String,
  rightLabel: String,
  canStartAtZero: {
    type: Boolean,
    required: true,
    default: false
  },
  escale: {
    type: String,
    required: true
  }
}, { _id: false })

const DateConfigSchema = new mongoose.Schema({
  isDateRequired: {
    type: Boolean,
    required: true,
    default: false
  },
  dateFormat: String,
  isTimeRequired: {
    type: Boolean,
    required: true,
    default: false
  },
  timeFormat: String,
  canCaptureInterval: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false })

const DropDownConfigSchema = new mongoose.Schema({
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false
  },
  answerOptions: [{
    type: AnswerOptionSchema,
    required: true
  }]
}, { _id: false })

const MatrixConfigSchema = new mongoose.Schema({
  isMultipleChoice: {
    type: Boolean,
    required: true,
    default: false
  },
  rowsLabels: [{
    type: String,
    required: true
  }],
  colsLabels: [{
    type: String,
    required: true
  }],
  answerOptions: [[{
    type: AnswerOptionSchema,
    required: true
  }]]
}, { _id: false })

const SliderConfigSchema = new mongoose.Schema({
  minValue: {
    type: Number,
    validate: Number.isInteger,
    required: true
  },
  minLabel: String,
  maxValue: {
    type: Number,
    validate: Number.isInteger,
    required: true
  },
  maxLabel: String,
  incValue: {
    type: Number,
    validate: Number.isInteger,
    required: true
  },
  canHideValue: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false })

const LongTextConfigSchema = new mongoose.Schema({
  placeholder: String,
  hasLimitedChars: {
    type: Boolean,
    required: true,
    default: false
  },
  maxChars: {
    type: Number,
    validate: Number.isInteger
  }
}, { _id: false })

const RadioButtonConfigSchema = new mongoose.Schema({
  hasHorizontalAlignment: {
    type: Boolean,
    required: true,
    default: false
  },
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false
  },
  answerOptions: [{
    type: AnswerOptionSchema,
    required: true
  }]
}, { _id: false })

const QuestionConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  isRequired: {
    type: Boolean,
    required: true,
    default: false
  },
  checkBox: CheckBoxConfigSchema,
  date: DateConfigSchema,
  dropDown: DropDownConfigSchema,
  email: EmailConfigSchema,
  imageChoice: ImageChoiceConfigSchema,
  link: LinkConfigSchema,
  longText: LongTextConfigSchema,
  matrix: MatrixConfigSchema,
  nps: NPSConfigSchema,
  number: NumberConfigSchema,
  phone: PhoneConfigSchema,
  radioButton: RadioButtonConfigSchema,
  shortText: ShortTextConfigSchema,
  slider: SliderConfigSchema
}, { _id: false })

const QuestionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'QuestionType',
    required: true
  },
  formPage: {
    type: Number,
    validate: Number.isInteger,
    required: true
  },
  config: {
    type: QuestionConfigSchema,
    required: true
  }
}, { timestamps: true })

const Question = mongoose.model<QuestionDocument>('Question', QuestionSchema)

export default Question
