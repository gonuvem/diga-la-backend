import { QuestionTypeAlias } from '../../enums'
import {
  fakeBoolean,
  fakeRandomInt,
  fakeText,
  fakePhoto,
  fakeArray,
  fakeWord,
  fakeSentence,
  fakeId
} from '../fakers'

export const NumberConfig = {
  hasMaxMinLimit: fakeBoolean,
  maxValue: fakeRandomInt({ min: 5, max: 100 }),
  minValue: fakeRandomInt({ min: 0, max: 1 }),
  incValue: fakeRandomInt({ min: 1, max: 10 })
}

export const AnswerOption = {
  text: fakeText,
  image: fakePhoto
}

const fakeAnswerOptions = (): object[] => fakeArray(() => AnswerOption, 3)

export const CheckBoxConfig = {
  hasHorizontalAlignment: fakeBoolean,
  hasRandomResponsesOrder: fakeBoolean,
  answerOptions: fakeAnswerOptions
}

export const EmailConfig = {
  hasValidation: fakeBoolean
}

export const PhoneConfig = {
  hasValidation: fakeBoolean
}

export const LinkConfig = {
  hasValidation: fakeBoolean
}

export const ImageChoiceConfig = {
  isMultipleChoice: fakeBoolean,
  maxChoices: fakeRandomInt({ min: 1, max: 3 }),
  hasRandomResponsesOrder: fakeBoolean,
  answerOptions: fakeAnswerOptions
}

export const ShortTextConfig = {
  placeholder: fakeWord,
  hasLimitedChars: fakeBoolean,
  maxChars: fakeRandomInt({ min: 1, max: 140 })
}

export const NPSConfig = {
  canDisplayLabels: fakeBoolean,
  leftLabel: fakeWord,
  rightLabel: fakeWord,
  canStartAtZero: fakeBoolean,
  escale: fakeWord
}

export const DateConfig = {
  isDateRequired: fakeBoolean,
  dateFormat: fakeWord,
  isTimeRequired: fakeBoolean,
  timeFormat: fakeWord,
  canCaptureInterval: fakeBoolean
}

export const DropDownConfig = {
  hasRandomResponsesOrder: fakeBoolean,
  answerOptions: fakeAnswerOptions
}

export const MatrixConfig = {
  isMultipleChoice: fakeBoolean,
  rowsLabels: fakeArray(fakeWord, 3),
  colsLabels: fakeArray(fakeWord, 3),
  answerOptions: fakeArray(fakeAnswerOptions, 3)
}

export const SliderConfig = {
  minValue: fakeRandomInt({ min: 0, max: 100 }),
  minLabel: fakeWord,
  maxValue: fakeRandomInt({ min: 5, max: 100 }),
  maxLabel: fakeWord,
  incValue: fakeRandomInt({ min: 1, max: 100 }),
  canHideValue: fakeBoolean
}

export const LongTextConfig = {
  placeholder: fakeWord,
  hasLimitedChars: fakeBoolean,
  maxChars: fakeRandomInt({ min: 1, max: 500 })
}

export const RadioButtonConfig = {
  hasHorizontalAlignment: fakeBoolean,
  hasRandomResponsesOrder: fakeBoolean,
  answerOptions: fakeAnswerOptions
}

export const QuestionConfig = {
  name: fakeWord,
  description: fakeSentence,
  isRequired: fakeBoolean,
  [QuestionTypeAlias.CheckBox]: (): object => CheckBoxConfig,
  [QuestionTypeAlias.Date]: (): object => DateConfig,
  [QuestionTypeAlias.DropDown]: (): object => DropDownConfig,
  [QuestionTypeAlias.Email]: (): object => EmailConfig,
  [QuestionTypeAlias.ImageChoice]: (): object => ImageChoiceConfig,
  [QuestionTypeAlias.Link]: (): object => LinkConfig,
  [QuestionTypeAlias.LongText]: (): object => LongTextConfig,
  [QuestionTypeAlias.Matrix]: (): object => MatrixConfig,
  [QuestionTypeAlias.NPS]: (): object => NPSConfig,
  [QuestionTypeAlias.Number]: (): object => NumberConfig,
  [QuestionTypeAlias.Phone]: (): object => PhoneConfig,
  [QuestionTypeAlias.RadioButton]: (): object => RadioButtonConfig,
  [QuestionTypeAlias.ShortText]: (): object => ShortTextConfig,
  [QuestionTypeAlias.Slider]: (): object => SliderConfig
}

export const Question = {
  form: fakeId,
  type: fakeId,
  formPage: fakeRandomInt({ min: 1, max: 10 }),
  config: (): object => QuestionConfig
}
