import { Role } from 'src/enums'
import {
  fullNameSchema,
  cpfSchema,
  passwordSchema,
  emailSchema,
  arraySchema,
  renewPasswordCodeSchema,
  stringEnumSchema
} from '../baseSchemas'

export const userRoleSchema = stringEnumSchema(Role)

export const User = {
  name: fullNameSchema,
  cpf: cpfSchema,
  password: passwordSchema,
  email: emailSchema,
  roles: arraySchema(userRoleSchema.required()),
  renewPasswordCode: renewPasswordCodeSchema
}
