import { QuestionTypeAlias } from '../../enums';
import {
  fakeBoolean,
  fakeRandomInt,
  fakeText,
  fakePhoto,
  fakeArray,
  fakeWord,
  fakeSentence,
  fakeId,
} from '../fakers';
import {
  NumberConfig,
  AnswerOption,
  CheckBoxConfig,
  EmailConfig,
  PhoneConfig,
  LinkConfig,
  ImageChoiceConfig,
  ShortTextConfig,
  NPSConfig,
  DateConfig,
  DropDownConfig,
  MatrixConfig,
  SliderConfig,
  LongTextConfig,
  RadioButtonConfig,
  QuestionInterface,
  QuestionConfig,
  SortListConfig,
} from '../../interfaces';
import { Fake } from '../../types';

const fakeNumberConfig: NumberConfig = {
  hasMaxMinLimit: fakeBoolean(),
  maxValue: fakeRandomInt({ min: 5, max: 100 })(),
  minValue: fakeRandomInt({ min: 0, max: 1 })(),
  incValue: fakeRandomInt({ min: 1, max: 10 })(),
};

const fakeAnswerOption: AnswerOption = {
  text: fakeText(),
  image: fakePhoto(),
};

const fakeAnswerOptions = (): AnswerOption[] =>
  fakeArray(() => fakeAnswerOption, 3);

const fakeCheckBoxConfig: CheckBoxConfig = {
  hasHorizontalAlignment: fakeBoolean(),
  hasRandomResponsesOrder: fakeBoolean(),
  hasLimitedChoices: fakeBoolean(),
  maxChoices: fakeRandomInt({ min: 1, max: 3 })(),
  answerOptions: fakeAnswerOptions(),
};

const fakeEmailConfig: EmailConfig = {
  hasValidation: fakeBoolean(),
};

const fakePhoneConfig: PhoneConfig = {
  hasValidation: fakeBoolean(),
};

const fakeLinkConfig: LinkConfig = {
  hasValidation: fakeBoolean(),
};

const fakeImageChoiceConfig: ImageChoiceConfig = {
  isMultipleChoice: fakeBoolean(),
  maxChoices: fakeRandomInt({ min: 1, max: 3 })(),
  hasRandomResponsesOrder: fakeBoolean(),
  answerOptions: fakeAnswerOptions(),
};

const fakeShortTextConfig: ShortTextConfig = {
  placeholder: fakeWord(),
  hasLimitedChars: fakeBoolean(),
  maxChars: fakeRandomInt({ min: 1, max: 140 })(),
};

const fakeNPSConfig: NPSConfig = {
  canDisplayLabels: fakeBoolean(),
  leftLabel: fakeWord(),
  rightLabel: fakeWord(),
  canStartAtZero: fakeBoolean(),
  escale: fakeRandomInt({ min: 1, max: 10 })(),
};

const fakeDateConfig: DateConfig = {
  isDateRequired: fakeBoolean(),
  dateFormat: fakeWord(),
  isTimeRequired: fakeBoolean(),
  timeFormat: fakeWord(),
  canCaptureInterval: fakeBoolean(),
};

const fakeDropDownConfig: DropDownConfig = {
  hasRandomResponsesOrder: fakeBoolean(),
  answerOptions: fakeAnswerOptions(),
};

const fakeMatrixConfig: MatrixConfig = {
  isMultipleChoice: fakeBoolean(),
  rowsLabels: fakeArray(fakeWord, 3),
  colsLabels: fakeArray(fakeWord, 3),
};

const fakeSliderConfig: SliderConfig = {
  minValue: fakeRandomInt({ min: 0, max: 100 })(),
  minLabel: fakeWord(),
  maxValue: fakeRandomInt({ min: 5, max: 100 })(),
  maxLabel: fakeWord(),
  canHideValue: fakeBoolean(),
};

const fakeLongTextConfig: LongTextConfig = {
  placeholder: fakeWord(),
  hasLimitedChars: fakeBoolean(),
  maxChars: fakeRandomInt({ min: 1, max: 500 })(),
};

const fakeRadioButtonConfig: RadioButtonConfig = {
  hasHorizontalAlignment: fakeBoolean(),
  hasRandomResponsesOrder: fakeBoolean(),
  answerOptions: fakeAnswerOptions(),
};

const fakeSortListConfig: SortListConfig = {
  hasRandomResponsesOrder: fakeBoolean(),
  answerOptions: fakeAnswerOptions(),
};

const fakeQuestionConfig: QuestionConfig = {
  name: fakeWord(),
  description: fakeSentence(),
  isRequired: fakeBoolean(),
  [QuestionTypeAlias.CheckBox]: ((): CheckBoxConfig => fakeCheckBoxConfig)(),
  [QuestionTypeAlias.Date]: ((): DateConfig => fakeDateConfig)(),
  [QuestionTypeAlias.DropDown]: ((): DropDownConfig => fakeDropDownConfig)(),
  [QuestionTypeAlias.Email]: ((): EmailConfig => fakeEmailConfig)(),
  [QuestionTypeAlias.ImageChoice]: ((): ImageChoiceConfig =>
    fakeImageChoiceConfig)(),
  [QuestionTypeAlias.Link]: ((): LinkConfig => fakeLinkConfig)(),
  [QuestionTypeAlias.LongText]: ((): LongTextConfig => fakeLongTextConfig)(),
  [QuestionTypeAlias.Matrix]: ((): MatrixConfig => fakeMatrixConfig)(),
  [QuestionTypeAlias.NPS]: ((): NPSConfig => fakeNPSConfig)(),
  [QuestionTypeAlias.Number]: ((): NumberConfig => fakeNumberConfig)(),
  [QuestionTypeAlias.Phone]: ((): PhoneConfig => fakePhoneConfig)(),
  [QuestionTypeAlias.RadioButton]: ((): RadioButtonConfig =>
    fakeRadioButtonConfig)(),
  [QuestionTypeAlias.ShortText]: ((): ShortTextConfig => fakeShortTextConfig)(),
  [QuestionTypeAlias.Slider]: ((): SliderConfig => fakeSliderConfig)(),
  [QuestionTypeAlias.SortList]: ((): SortListConfig => fakeSortListConfig)(),
};

export const Question: Fake<QuestionInterface> = {
  form: fakeId,
  type: fakeId,
  formPage: fakeRandomInt({ min: 1, max: 10 }),
  position: fakeRandomInt({ min: 0, max: 10 }),
  config: (): QuestionConfig => fakeQuestionConfig,
};
