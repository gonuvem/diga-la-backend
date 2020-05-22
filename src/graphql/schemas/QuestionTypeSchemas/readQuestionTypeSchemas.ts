const ReadQuestionTypeType = `
"Resposta da query que detalha um tipo de questão"
type ReadQuestionType {
  "Tipo de questão consultado"
  type: QuestionType
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 731          |    404     | Tipo de questão não encontrado                              |
  """
  error: MyError
}
`

const readQuestionTypeQuery = `
"Detalha um tipo de questão."
readQuestionType(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): ReadQuestionType!
`

export const types = ReadQuestionTypeType

export const Query = readQuestionTypeQuery
