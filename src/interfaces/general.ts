export interface FetchParams {
  conditions?: object,
  projection?: string,
  lean?: boolean
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
