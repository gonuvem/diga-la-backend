import mongoose from 'mongoose'

import {
  FormDocument,
  FormConfig,
  FormStyle,
  FormInterface
} from '../interfaces'
import { MongooseDefinition } from '../types'
import './Client'

const formConfigDefinition: MongooseDefinition<FormConfig> = {
  name: {
    type: String,
    required: true
  },
  description: String,
  beginDate: Date,
  endDate: Date,
  hasLimitedResponses: {
    type: Boolean,
    required: true,
    default: false
  },
  maxResponses: {
    type: Number,
    validate: Number.isInteger
  },
  isTotemMode: {
    type: Boolean,
    required: true,
    default: false
  },
  canDisplayProgressBar: {
    type: Boolean,
    required: true,
    default: false
  },
  progressBarType: String,
  canAllowMultipleSubmissions: {
    type: Boolean,
    required: true,
    default: false
  }
}
const FormConfigSchema = new mongoose.Schema(formConfigDefinition,
  { _id: false })

const formStyleDefinition: MongooseDefinition<FormStyle> = {
  background: String,
  logo: String,
  headerText: String,
  hasLogoInHeader: {
    type: Boolean,
    required: true,
    default: false
  },
  headerBackground: String,
  footerText: String,
  footerBackground: String
}

const FormStyleSchema = new mongoose.Schema(formStyleDefinition, { _id: false })

const formDefinition: MongooseDefinition<FormInterface> = {
  client: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  config: {
    type: FormConfigSchema,
    required: true
  },
  style: {
    type: FormStyleSchema,
    required: true
  }
}

const FormSchema = new mongoose.Schema(formDefinition, { timestamps: true })

FormSchema.virtual('numResponses', {
  ref: 'Response',
  localField: '_id',
  foreignField: 'form',
  count: true
})

const Form = mongoose.model<FormDocument>('Form', FormSchema)

export default Form
