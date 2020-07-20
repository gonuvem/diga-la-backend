import Joi from '@hapi/joi';

import { QuestionTypeAlias } from '../../../../enums';
import {
  arraySchema,
  idSchema,
  basicStringSchema,
  booleanSchema,
  integerSchema,
  urlSchema,
} from '../baseSchemas';
import { JoiSchemaMap } from '../../../../types';
import {
  NumberConfig,
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
  QuestionConfig,
  QuestionInterface,
  AnswerOption,
  SortListConfig,
} from '../../../../interfaces';

export const NumberConfigSchema: JoiSchemaMap<NumberConfig> = {
  hasMaxMinLimit: booleanSchema,
  maxValue: integerSchema,
  minValue: integerSchema,
  incValue: integerSchema.min(1),
};

export const AnswerOptionSchema: JoiSchemaMap<AnswerOption> = {
  text: basicStringSchema,
  image: urlSchema,
};

const answerOptionsSchema = arraySchema(
  Joi.object(AnswerOptionSchema).required()
);

export const CheckBoxConfigSchema: JoiSchemaMap<CheckBoxConfig> = {
  hasHorizontalAlignment: booleanSchema,
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema,
};

export const EmailConfigSchema: JoiSchemaMap<EmailConfig> = {
  hasValidation: booleanSchema,
};

export const PhoneConfigSchema: JoiSchemaMap<PhoneConfig> = {
  hasValidation: booleanSchema,
};

export const LinkConfigSchema: JoiSchemaMap<LinkConfig> = {
  hasValidation: booleanSchema,
};

export const ImageChoiceConfigSchema: JoiSchemaMap<ImageChoiceConfig> = {
  isMultipleChoice: booleanSchema,
  maxChoices: integerSchema.min(1),
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema,
};

export const ShortTextConfigSchema: JoiSchemaMap<ShortTextConfig> = {
  placeholder: basicStringSchema,
  hasLimitedChars: booleanSchema,
  maxChars: integerSchema.min(1),
};

export const NPSConfigSchema: JoiSchemaMap<NPSConfig> = {
  canDisplayLabels: booleanSchema,
  leftLabel: basicStringSchema,
  rightLabel: basicStringSchema,
  canStartAtZero: booleanSchema,
  escale: basicStringSchema,
};

export const DateConfigSchema: JoiSchemaMap<DateConfig> = {
  isDateRequired: booleanSchema,
  dateFormat: basicStringSchema,
  isTimeRequired: booleanSchema,
  timeFormat: basicStringSchema,
  canCaptureInterval: booleanSchema,
};

export const DropDownConfigSchema: JoiSchemaMap<DropDownConfig> = {
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema,
};

export const MatrixConfigSchema: JoiSchemaMap<MatrixConfig> = {
  isMultipleChoice: booleanSchema,
  rowsLabels: arraySchema(basicStringSchema.required()),
  colsLabels: arraySchema(basicStringSchema.required()),
};

export const SliderConfigSchema: JoiSchemaMap<SliderConfig> = {
  minValue: integerSchema,
  minLabel: basicStringSchema,
  maxValue: integerSchema,
  maxLabel: basicStringSchema,
  canHideValue: booleanSchema,
};

export const LongTextConfigSchema: JoiSchemaMap<LongTextConfig> = {
  placeholder: basicStringSchema,
  hasLimitedChars: booleanSchema,
  maxChars: integerSchema.min(1),
};

export const RadioButtonConfigSchema: JoiSchemaMap<RadioButtonConfig> = {
  hasHorizontalAlignment: booleanSchema,
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema,
};

export const SortListConfigSchema: JoiSchemaMap<SortListConfig> = {
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema,
};

export const QuestionConfigSchema: JoiSchemaMap<QuestionConfig> = {
  name: basicStringSchema,
  description: basicStringSchema,
  isRequired: booleanSchema,
  [QuestionTypeAlias.CheckBox]: Joi.object(CheckBoxConfigSchema),
  [QuestionTypeAlias.Date]: Joi.object(DateConfigSchema),
  [QuestionTypeAlias.DropDown]: Joi.object(DropDownConfigSchema),
  [QuestionTypeAlias.Email]: Joi.object(EmailConfigSchema),
  [QuestionTypeAlias.ImageChoice]: Joi.object(ImageChoiceConfigSchema),
  [QuestionTypeAlias.Link]: Joi.object(LinkConfigSchema),
  [QuestionTypeAlias.LongText]: Joi.object(LongTextConfigSchema),
  [QuestionTypeAlias.Matrix]: Joi.object(MatrixConfigSchema),
  [QuestionTypeAlias.NPS]: Joi.object(NPSConfigSchema),
  [QuestionTypeAlias.Number]: Joi.object(NumberConfigSchema),
  [QuestionTypeAlias.Phone]: Joi.object(PhoneConfigSchema),
  [QuestionTypeAlias.RadioButton]: Joi.object(RadioButtonConfigSchema),
  [QuestionTypeAlias.ShortText]: Joi.object(ShortTextConfigSchema),
  [QuestionTypeAlias.Slider]: Joi.object(SliderConfigSchema),
  [QuestionTypeAlias.SortList]: Joi.object(SortListConfigSchema),
};

export const Question: JoiSchemaMap<QuestionInterface> = {
  form: idSchema,
  type: idSchema,
  formPage: integerSchema.min(1),
  position: integerSchema.min(0),
  config: Joi.object(QuestionConfigSchema),
};
