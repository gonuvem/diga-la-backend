/* eslint-disable max-lines */
import mongoose from 'mongoose';

import {
  QuestionDocument,
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
  QuestionConfig,
  QuestionInterface,
  SortListConfig,
} from '../interfaces';
import { MongooseDefinition } from '../types';
import './Form';
import './QuestionType';

const numberConfigDefinition: MongooseDefinition<NumberConfig> = {
  hasMaxMinLimit: {
    type: Boolean,
    required: true,
    default: false,
  },
  maxValue: {
    type: Number,
    validate: Number.isInteger,
  },
  minValue: {
    type: Number,
    validate: Number.isInteger,
  },
  incValue: {
    type: Number,
    validate: Number.isInteger,
  },
};

const NumberConfigSchema = new mongoose.Schema(numberConfigDefinition, {
  _id: false,
});

const answerOptionDefinition: MongooseDefinition<AnswerOption> = {
  text: {
    type: String,
    required: true,
  },
  image: String,
};

const AnswerOptionSchema = new mongoose.Schema(answerOptionDefinition);

const checkBoxDefinition: MongooseDefinition<CheckBoxConfig> = {
  hasHorizontalAlignment: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false,
  },
  answerOptions: [
    {
      type: AnswerOptionSchema,
      required: true,
    },
  ],
};

const CheckBoxConfigSchema = new mongoose.Schema(checkBoxDefinition, {
  _id: false,
});

const emailDefinition: MongooseDefinition<EmailConfig> = {
  hasValidation: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const EmailConfigSchema = new mongoose.Schema(emailDefinition, { _id: false });

const phoneDefinition: MongooseDefinition<PhoneConfig> = {
  hasValidation: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const PhoneConfigSchema = new mongoose.Schema(phoneDefinition, { _id: false });

const linkDefinition: MongooseDefinition<LinkConfig> = {
  hasValidation: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const LinkConfigSchema = new mongoose.Schema(linkDefinition, { _id: false });

const imageChoiceDefinition: MongooseDefinition<ImageChoiceConfig> = {
  isMultipleChoice: {
    type: Boolean,
    required: true,
    default: false,
  },
  maxChoices: {
    type: Number,
    validate: Number.isInteger,
  },
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false,
  },
  answerOptions: [
    {
      type: AnswerOptionSchema,
      required: true,
    },
  ],
};

const ImageChoiceConfigSchema = new mongoose.Schema(imageChoiceDefinition, {
  _id: false,
});

const shortTextDefinition: MongooseDefinition<ShortTextConfig> = {
  placeholder: String,
  hasLimitedChars: {
    type: Boolean,
    required: true,
    default: false,
  },
  maxChars: {
    type: Number,
    validate: Number.isInteger,
  },
};
const ShortTextConfigSchema = new mongoose.Schema(shortTextDefinition, {
  _id: false,
});

const NPSDefinition: MongooseDefinition<NPSConfig> = {
  canDisplayLabels: {
    type: Boolean,
    required: true,
    default: false,
  },
  leftLabel: String,
  rightLabel: String,
  canStartAtZero: {
    type: Boolean,
    required: true,
    default: false,
  },
  escale: {
    type: String,
    required: true,
  },
};

const NPSConfigSchema = new mongoose.Schema(NPSDefinition, { _id: false });

const dateDefinition: MongooseDefinition<DateConfig> = {
  isDateRequired: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateFormat: String,
  isTimeRequired: {
    type: Boolean,
    required: true,
    default: false,
  },
  timeFormat: String,
  canCaptureInterval: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const DateConfigSchema = new mongoose.Schema(dateDefinition, { _id: false });

const dropDownDefinition: MongooseDefinition<DropDownConfig> = {
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false,
  },
  answerOptions: [
    {
      type: AnswerOptionSchema,
      required: true,
    },
  ],
};

const DropDownConfigSchema = new mongoose.Schema(dropDownDefinition, {
  _id: false,
});

const matrixConfigDefinition: MongooseDefinition<MatrixConfig> = {
  isMultipleChoice: {
    type: Boolean,
    required: true,
    default: false,
  },
  rowsLabels: [
    {
      type: String,
      required: true,
    },
  ],
  colsLabels: [
    {
      type: String,
      required: true,
    },
  ],
};

const MatrixConfigSchema = new mongoose.Schema(matrixConfigDefinition, {
  _id: false,
});

const sliderDefinition: MongooseDefinition<SliderConfig> = {
  minValue: {
    type: Number,
    validate: Number.isInteger,
    required: true,
  },
  minLabel: String,
  maxValue: {
    type: Number,
    validate: Number.isInteger,
    required: true,
  },
  maxLabel: String,
  incValue: {
    type: Number,
    validate: Number.isInteger,
    required: true,
  },
  canHideValue: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const SliderConfigSchema = new mongoose.Schema(sliderDefinition, {
  _id: false,
});

const longTextDefinition: MongooseDefinition<LongTextConfig> = {
  placeholder: String,
  hasLimitedChars: {
    type: Boolean,
    required: true,
    default: false,
  },
  maxChars: {
    type: Number,
    validate: Number.isInteger,
  },
};

const LongTextConfigSchema = new mongoose.Schema(longTextDefinition, {
  _id: false,
});

const radioButtonDefinition: MongooseDefinition<RadioButtonConfig> = {
  hasHorizontalAlignment: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false,
  },
  answerOptions: [
    {
      type: AnswerOptionSchema,
      required: true,
    },
  ],
};

const RadioButtonConfigSchema = new mongoose.Schema(radioButtonDefinition, {
  _id: false,
});

const sortListDefinition: MongooseDefinition<SortListConfig> = {
  hasRandomResponsesOrder: {
    type: Boolean,
    required: true,
    default: false,
  },
  answerOptions: [
    {
      type: AnswerOptionSchema,
      required: true,
    },
  ],
};

const SortListConfigSchema = new mongoose.Schema(sortListDefinition, {
  _id: false,
});

const questionConfigDefinition: MongooseDefinition<QuestionConfig> = {
  name: {
    type: String,
    required: true,
  },
  description: String,
  isRequired: {
    type: Boolean,
    required: true,
    default: false,
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
  slider: SliderConfigSchema,
  sortList: SortListConfigSchema,
};

const QuestionConfigSchema = new mongoose.Schema(questionConfigDefinition, {
  _id: false,
});

const questionDefinition: MongooseDefinition<QuestionInterface> = {
  form: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'QuestionType',
    required: true,
  },
  formPage: {
    type: Number,
    validate: Number.isInteger,
    required: true,
  },
  position: {
    type: Number,
    validate: Number.isInteger,
    required: true,
  },
  config: {
    type: QuestionConfigSchema,
    required: true,
  },
};

const QuestionSchema = new mongoose.Schema(questionDefinition, {
  timestamps: true,
});

const Question = mongoose.model<QuestionDocument>('Question', QuestionSchema);

export default Question;
