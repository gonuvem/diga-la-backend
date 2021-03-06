import { Types } from 'mongoose'

import { isNotEmptyArray } from './general'
import {
  IdFilterObject,
  BooleanFilterObject,
  DateIntervalFilterObject,
  StringFilterObject,
  ArrayFilterObject,
  FieldFilterObject,
  NumberFilterObject
} from '../interfaces'
import { ID } from '../types'

export const createIdFilter = (field: IdFilterObject)
: { [field: string]: ID } => {
  return field.value
    ? { [field.name]: Types.ObjectId(field.value as string) }
    : {}
}

export const createBooleanFilter = (field: BooleanFilterObject)
: { [field: string]: boolean } => {
  return field.value !== undefined ? { [field.name]: field.value } : {}
}

export const createDateIntervalFilter = (field: DateIntervalFilterObject):
 { [field: string]: { $gte: Date, $lte: Date } } => {
  return field.value.beginDate && field.value.endDate
    ? {
      [field.name]: {
        $gte: field.value.beginDate,
        $lte: field.value.endDate
      }
    }
    : {}
}

export const createStringFilter = (field: StringFilterObject)
: { [field: string]: string } => {
  return field.value ? { [field.name]: field.value } : {}
}

export const createNumberFilter = (field: NumberFilterObject)
: { [field: string]: number } => {
  return field.value ? { [field.name]: field.value } : {}
}

export const createArrayFilter = (field: ArrayFilterObject)
: { [field: string]: { $in: unknown[] } } => {
  return isNotEmptyArray(field.value)
    ? { [field.name]: { $in: field.value } }
    : {}
}

export const createFilterQuery = async (fields: Array<FieldFilterObject>)
: Promise<object> => {
  const mapFilterTypeToQuery: { [filterType: string]: Function } = {
    id: createIdFilter,
    boolean: createBooleanFilter,
    dateInterval: createDateIntervalFilter,
    string: createStringFilter,
    list: createArrayFilter,
    number: createNumberFilter
  }

  const filterQuery = fields.reduce(
    (filter, f) => Object.assign(filter, mapFilterTypeToQuery[f.type](f)),
    {}
  )

  return filterQuery
}
