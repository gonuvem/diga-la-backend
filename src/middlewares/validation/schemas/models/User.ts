import { Role } from '../../../../enums'
import {
  fullNameSchema,
  passwordSchema,
  emailSchema,
  arraySchema,
  renewPasswordCodeSchema,
  stringEnumSchema
} from '../baseSchemas'
import { UserInterface } from '../../../../interfaces'
import { JoiSchemaMap } from '../../../../types'

export const userRoleSchema = stringEnumSchema(Role)

export const User: JoiSchemaMap<UserInterface> = {
  name: fullNameSchema,
  password: passwordSchema,
  email: emailSchema,
  roles: arraySchema(userRoleSchema.required()),
  renewPasswordCode: renewPasswordCodeSchema
}
