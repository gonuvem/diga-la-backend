import { ID } from '../types'

export interface FetchParams {
  conditions?: object,
  projection?: string,
  sort?: string,
  lean?: boolean,
}

export interface UpdateParams {
  conditions: object,
  updateData: object
}

export interface BaseListResult<T> {
  objects: Array<T>,
  total: number,
  pages: number
}

export interface ListPaginatedParams {
  conditions?: object,
  projection?: string,
  sort?: string,
  page?: number,
  perPage?: number
}

export type FilterTypes = 'id' | 'boolean' | 'dateInterval' | 'string' | 'list'
| 'number'

export interface FieldFilterObject {
  type: FilterTypes,
  name: string,
  value: string | boolean | Date | DateInterval | Array<unknown> | number | ID
}

export interface IdFilterObject extends FieldFilterObject {
  value: ID
}

export interface BooleanFilterObject extends FieldFilterObject {
  value: boolean
}

export interface DateInterval {
  beginDate: Date,
  endDate: Date
}

export interface DateIntervalFilterObject extends FieldFilterObject {
  value: DateInterval
}

export interface StringFilterObject extends FieldFilterObject {
  value: string
}

export interface ArrayFilterObject extends FieldFilterObject {
  value: Array<unknown>
}

export interface NumberFilterObject extends FieldFilterObject {
  value: number
}

export interface Timestamps {
  readonly createdAt: Date,
  readonly updatedAt: Date
}
