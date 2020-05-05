import mongoose, { Query, Document } from 'mongoose'
import { Boom } from '@hapi/boom'

import { FetchParams } from '../interfaces'

export function fetchOne<T extends Document>
(Model: mongoose.Model<T>, notFoundError: Boom) {
  return function (
    { conditions = {}, projection = '', lean = true } : FetchParams): Query<T> {
    return Model.findOne(conditions, projection).orFail(notFoundError)
      .lean(lean)
  }
}
