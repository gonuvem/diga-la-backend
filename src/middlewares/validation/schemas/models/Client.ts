import { idSchema } from '../baseSchemas'
import { JoiSchemaMap } from '../../../../types'
import { ClientInterface } from '../../../../interfaces'

export const Client: JoiSchemaMap<ClientInterface> = {
  user: idSchema
}
