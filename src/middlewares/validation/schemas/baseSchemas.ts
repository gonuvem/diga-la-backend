import Joi, { Schema } from '@hapi/joi'

/**
 * Primitive Types Schemas
 */

export const idSchema = Joi.string().strict().regex(/^[0-9a-fA-F]{24}$/)

export const integerSchema = Joi.number().strict().integer()

export const dateSchema = Joi.date().iso()

export const stringSchema = Joi.string().strict().allow('')

export const booleanSchema = Joi.boolean()

export const arraySchema = (schema: Schema): Joi.ArraySchema => {
  return Joi.array().items(schema)
}

export const stringEnumSchema = (stringEnum: object): Joi.StringSchema => {
  return Joi.string().strict().valid(...Object.values(stringEnum))
}

/**
 * Utils Schemas
 */

export const emailSchema = Joi.string().strict().email()

export const usernameSchema = Joi.string().strict().alphanum().min(4).max(16)

export const passwordSchema = Joi.string().strict().min(6)

export const basicStringSchema = Joi.string().strict()

export const renewPasswordCodeSchema = Joi.string().strict().hex().length(5)

export const urlSchema = Joi.string().strict().uri()

export const fullNameSchema = Joi.string().strict()
  .regex(/^[\w\W]+( [\w\W]+)+$/).max(80)

export const cpfSchema = Joi.string().strict().regex(/^[0-9]{11}$/)

export const pageSchema = Joi.number().integer().min(0).default(0)

export const perPageSchema = Joi.number().integer().min(1).default(5)

export const phoneSchema = Joi.string().strict().regex(/^[0-9]{10,11}$/)

export const addressSchema = Joi.object().keys({
  street: Joi.string().strict().max(80).optional(),
  number: Joi.string().strict().max(20).optional(),
  district: Joi.string().strict().max(60).optional(),
  city: Joi.string().strict().min(2).max(60).optional(),
  state: Joi.string().strict().regex(/^[A-Z]{2}$/).optional(),
  postalCode: Joi.string().strict().regex(/^[0-9]{8}$/).optional(),
  complement: Joi.string().strict().max(40).optional()
})

export const hexColorSchema = Joi.string().regex(/^#[0-9a-fA-F]{6}$/)

/**
 * CRUDL Schemas
 */

export const createSchema = (input: object): Joi.ObjectSchema => {
  return Joi.object({ input })
}

export const createSortSchema = (sortFields: Array<string>,
  defaultField: string): Schema => {
  return Joi.string().strict().valid(...sortFields).default(defaultField)
}

export const listSchema = (sortFields: string[], defaultField: string,
  filters = {}): Joi.ObjectSchema => {
  return Joi.object({
    q: basicStringSchema.optional(),
    page: pageSchema.optional(),
    perPage: perPageSchema.optional(),
    sort: createSortSchema(sortFields, defaultField).optional(),
    ...filters
  })
}

export const readSchema = Joi.object({ id: idSchema.required() })

export const updateSchema = (input: object): Joi.ObjectSchema => {
  return Joi.object({ id: idSchema.required(), input })
}

export const removeSchema = Joi.object({ id: idSchema.required() })
