const UpdateQuestionTypeInput = `
"Parâmetros para atualizar um tipo de questão. Pelo menos um dos campos opcionais deve ser enviado."
input UpdateQuestionTypeInput {
  "Um valor de Classificação"
  kind: QuestionTypeKind
  "Um valor de Apelido"
  alias: QuestionTypeAlias
  "Mínimo: 1 caracter"
  name: String
  "Formato de url válido"
  cover: String
  "Mínimo: 1 caracter"
  description: String
}
`

const UpdateQuestionTypeType = `
"Resposta da mutation que atualiza um tipo de questão"
type UpdateQuestionType {
  "Tipo de Questão atualizado"
  type: QuestionType
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 620          |    403     | Este usuário não possui permissão para esta ação            |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 733          |    409     | Já existe um tipo de questão com este apelido               |
  | 731          |    404     | Tipo de questão não encontrado                              |
  """
  error: MyError
}
`

const updateQuestionTypeMutation = `
"Mutation que atualiza um tipo de questão. APENAS PARA ('dev')"
updateQuestionType(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!, 
  input: UpdateQuestionTypeInput!
): UpdateQuestionType!
`

export const types = UpdateQuestionTypeType

export const inputs = UpdateQuestionTypeInput

export const Mutation = updateQuestionTypeMutation
