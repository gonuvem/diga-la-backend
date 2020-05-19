import mongoose, { Query, Document, QueryPopulateOptions } from 'mongoose'
import { Boom } from '@hapi/boom'

import {
  FetchParams,
  UpdateParams,
  ListPaginatedParams,
  BaseListResult
} from '../interfaces'
import { isEmptyArray } from './general'

export function fetchOne<T extends Document>
(Model: mongoose.Model<T>, notFoundError: Boom) {
  return function (
    { conditions = {}, projection = '', lean = true } : FetchParams): Query<T> {
    return Model.findOne(conditions, projection).orFail(notFoundError)
      .lean(lean)
  }
}

export function createOne<T extends Document> (Model: mongoose.Model<T>) {
  return async function ({ doc }: { doc: object }): Promise<T> {
    const obj = new Model(doc)

    return obj.save()
  }
}

export function createOneObject<T extends Document> (Model: mongoose.Model<T>) {
  return function ({ doc }: { doc: object }): T {
    return new Model(doc)
  }
}

export function updateOne<T extends Document>
(Model: mongoose.Model<T>, notFoundError: Boom) {
  return function ({ conditions, updateData }: UpdateParams): Query<T> {
    return Model.findOneAndUpdate(conditions, updateData, { new: true })
      .orFail(notFoundError).lean()
  }
}

export function deleteOne<T extends Document>
(Model: mongoose.Model<T>, notFoundError: Boom) {
  return function ({ conditions }: { conditions: object }): Query<T> {
    return Model.findOneAndDelete(conditions).orFail(notFoundError).lean()
  }
}

export function countByCriteria<T extends Document> (Model: mongoose.Model<T>) {
  return function ({ criteria }: { criteria: object }): Query<number> {
    return Model.countDocuments(criteria).lean()
  }
}

type CountInfo = { Model: mongoose.Model<Document>, fieldName: string }

export function checkInUse (countInfo: CountInfo[], inUseError: Boom) {
  return async function ({ id }: { id: string })
  : Promise<void> {
    const countsPromises = countInfo.map(({ Model, fieldName }) => {
      return countByCriteria(Model)({ criteria: { [fieldName]: id } })
    })

    const countsResults = await Promise.all(countsPromises)

    const total = countsResults.reduce((total, count) => total + count, 0)

    if (total > 0) throw inUseError
  }
}

type Populate = string | QueryPopulateOptions | QueryPopulateOptions[]

export function fetchOneWithPopulate<T extends Document> (
  Model: mongoose.Model<T>, notFoundError: Boom, paths: Populate) {
  return function ({ conditions = {}, projection = '', lean = true }
  : FetchParams): Query<T> {
    return Model.findOne(conditions, projection).populate(paths)
      .orFail(notFoundError).lean(lean)
  }
}

export function listPaginatedWithPopulate<T extends Document> (
  Model: mongoose.Model<T>, emptyArrayError: Boom, paths: Populate) {
  return async function ({
    conditions = {}, projection = '', sort = '', page = 0, perPage = 5
  }: ListPaginatedParams): Promise<BaseListResult<T>> {
    const [total, objects] = await Promise.all<number, T[]>([
      Model.find(conditions, projection).countDocuments().lean(),
      Model.find(conditions, projection).sort(sort).skip(page * perPage)
        .limit(perPage).populate(paths).lean()
    ])

    if (isEmptyArray(objects)) throw emptyArrayError

    const pages = Math.ceil(total / perPage)

    return { objects, total, pages }
  }
}

export function listPaginated<T extends Document>
(Model: mongoose.Model<T>, emptyArrayError: Boom) {
  return async function ({
    conditions = {}, projection = '', sort = '', page = 0, perPage = 5
  }: ListPaginatedParams): Promise<BaseListResult<T>> {
    const [total, objects] = await Promise.all<number, T[]>([
      Model.find(conditions, projection).countDocuments().lean(),
      Model.find(conditions, projection).sort(sort).skip(page * perPage)
        .limit(perPage).lean()
    ])

    if (isEmptyArray(objects)) throw emptyArrayError

    const pages = Math.ceil(total / perPage)

    return { objects, total, pages }
  }
}

export function fetchOneWithoutError<T extends Document>
(Model: mongoose.Model<T>) {
  return function (
    { conditions = {}, projection = '', lean = true }: FetchParams): Query<T> {
    return Model.findOne(conditions, projection).lean(lean)
  }
}

export function fetchAll<T extends Document> (Model: mongoose.Model<T>) {
  return function ({ conditions = {}, projection = '', lean = true }
    : FetchParams): Query<Array<T>> {
    return Model.find(conditions, projection).lean(lean)
  }
}

type LookupObject = {
  from: string,
  localField: string,
  foreignField: string,
  as: string
}
export const createLookupObj = (collection: string, localField: string,
  fK = '_id'): LookupObject => {
  return {
    from: collection,
    localField: localField,
    foreignField: fK,
    as: localField
  }
}
