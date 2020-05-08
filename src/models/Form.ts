import mongoose from 'mongoose'

import { FormDocument } from '../interfaces'
import './Client'

const FormConfigSchema = new mongoose.Schema({
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
}, { _id: false })

const FormStyleSchema = new mongoose.Schema({
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
}, { _id: false })

const FormSchema = new mongoose.Schema({
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
}, { timestamps: true })

const Form = mongoose.model<FormDocument>('Form', FormSchema)

export default Form
