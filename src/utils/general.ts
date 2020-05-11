export function isNotEmptyArray<T> (array: T[]): boolean {
  return array && array.length > 0
}

export function isEmptyArray<T> (array: T[]): boolean {
  return !isNotEmptyArray(array)
}
