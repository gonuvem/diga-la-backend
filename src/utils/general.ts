import { customAlphabet } from 'nanoid/async'

import { ID } from '../types'

export function isNotEmptyArray<T> (array: T[]): boolean {
  return array && array.length > 0
}

export function isEmptyArray<T> (array: T[]): boolean {
  return !isNotEmptyArray(array)
}

/**
 * Gera, de forma assíncrona, uma string aleatória de acordo com o alfabeto
 * e o tamanho informado.
 * @param {String} alphabet Alfabeto para geração da string.
 * Ex.: '1234567890abcdef'
 * @param {Number} len Tamanho da string a ser gerada. Ex.: 10.
 */
export const generateRandomString = (alphabet: string, len: number)
: Promise<string> => {
  const nanoid = customAlphabet(alphabet, len)

  return nanoid()
}

/**
 * Obtém um campo de um objeto.
 * @param o Objeto cujo campo será obtido
 * @param propertyName Nome do campo a ser obtido
 */
export function getProperty<T, K extends keyof T> (propertyName: K) {
  return function (o: T): T[K] {
    return o[propertyName] // o[propertyName] is of type T[K]
  }
}

/**
 * Obtém os campos de um objeto.
 * @param o Objeto cujos campos serão obtidos
 * @param propertyNames Nomes dos campos
 */
export function pluck<T, K extends keyof T> (propertyNames: K[]) {
  return function (o: T): T[K][] {
    return propertyNames.map(n => o[n])
  }
}

export function isIDEqual (id1: ID, id2: ID): boolean {
  return id1.toString() === id2.toString()
}

// interface Dictionary<T> {
//   [key: string]: T;
// }

// const groupBy = function<TItem> (array: TItem[], key: keyof TItem):
//  Dictionary<TItem[]> {
//   const result: Dictionary<TItem[]> = {}

//   return array.reduce((group, item) => {
//     (group[item[key]] = group[item[key]] || []).push(item)
//     return group
//   }, result)
// }
