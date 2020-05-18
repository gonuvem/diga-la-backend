/**
 * Cria uma query graphql, em String, de um valor.
 * @param value Valor que não seja uma String
 */
export const createNonStringValue = (value: any): string => `${value}`

/**
 * Cria uma query graphql, em String, de um valor.
 * @param value Valor que seja uma String
 */
export const createStringValue = (string: string): string => `"${string}"`

/**
 * Cria uma query grapqhl, em String, de um array de valores.
 * @param array Array de valores
 * @param func Função que cria cada valor separadamente
 */
export const createArrayInput = (array: any[], func: Function): string => {
  return `[${array.map(a => func(a)).join(',')}]`
}

/**
 * Cria uma query graphql, em String, para o argumento passado
 * @param name Nome do argumento
 * @param func Função que criará o valor em String do argumento
 */
export const createArgumentRest = (name: string,
  func: Function = createStringValue) => (value: any): string => {
  return `, ${name}: ${func(value)}`
}

type FilterTest = {
  field: string,
  value: any,
  createRest: Function,
  filterFunc: Function
}

/**
 * Cria um array de testes para um filtro
 * @param fieldName Nome do campo de filtro
 * @param createRestFunc Função que cria a query grapqhl em String do filtro
 * @param filterFunc Função que filtra os objetos de teste para comparação
 * @param values Valores a serem testados para este filtro
 */
export const createFilterTests = (fieldName: string, createRestFunc: Function,
  filterFunc: Function, values: any[]): FilterTest[] => {
  return values.map(value => ({
    field: fieldName,
    value: value,
    createRest: createRestFunc,
    filterFunc: filterFunc
  }))
}
