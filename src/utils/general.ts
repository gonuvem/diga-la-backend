import { customAlphabet } from 'nanoid/async'

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
