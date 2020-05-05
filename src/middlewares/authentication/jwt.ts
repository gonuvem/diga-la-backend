import jwt from 'jsonwebtoken'

import { INVALID_TOKEN } from '../errorHandling/errors'
import { TokenPayload } from '../../types'
import jwtConfig from './config'

export const sign = (payload: TokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtConfig.JWT_SECRET, jwtConfig.options, (err, encoded) =>
      err ? reject(err) : resolve(encoded)
    )
  })
}

export const verify = (token: string): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtConfig.JWT_SECRET, jwtConfig.options, (err, decoded) =>
      err ? reject(INVALID_TOKEN) : resolve(decoded as TokenPayload)
    )
  })
}
