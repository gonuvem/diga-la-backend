import {
  verifyToken
} from '../../../middlewares/authentication/authenticationHelper'
import { ValidateTokenParams } from '../../../types'

export async function validateToken ({ token }: ValidateTokenParams):
 Promise<{}> {
  await verifyToken(token)

  return {}
}
