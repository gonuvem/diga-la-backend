const ReadOwnQuestionType = `
"Resposta da query que detalha questão do cliente logado"
type ReadOwnQuestion {
  "Questão consultada"
  question: Question
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 620          |    403     | Este usuário não possui permissão para esta ação            |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 711          |    404     | Cliente não encontrado                                      |
  | 751          |    404     | Questão não encontrada                                      |
  """
  error: MyError
}
`

const readOwnQuestionQuery = `
"Detalha questão do cliente logado. APENAS PARA ('client')"
readOwnQuestion(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): ReadOwnQuestion!
`

export const types = ReadOwnQuestionType

export const Query = readOwnQuestionQuery
