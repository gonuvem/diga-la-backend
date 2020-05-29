import {
  listSchema, idSchema
} from '../baseSchemas'
import { Response } from '../models/Response'
import {
  JoiSchemaMap,
  ListOwnResponsesParams
} from '../../../../types'

const sortFields = ['createdAt', '-createdAt']
const defaultField = '-createdAt'
const filters: JoiSchemaMap<ListOwnResponsesParams> = {
  form: Response.form.required(),
  question: idSchema.optional()
}

const listOwn = listSchema(sortFields, defaultField, filters)

export default {
  listOwnResponses: listOwn
}
