const CreateQuestionTypeInput = `
"Parâmetros para criação de tipo de questão"
input CreateQuestionTypeInput {
  "Um valor de Classificação"
  kind: QuestionTypeKind!
  "Um valor de Apelido"
  alias: QuestionTypeAlias!
  "Mínimo: 1 caracter"
  name: String!
  "Formato de url válido"
  cover: String!
  "Mínimo: 1 caracter"
  description: String!
}
`

const CreateQuestionTypeType = `
"Resposta da mutation que cria tipo de questão"
type CreateQuestionType {
  "Tipo de Questão criado"
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
  """
  error: MyError
}
`

const createQuestionTypeMutation = `
"Cria tipo de questão. APENAS PARA ('dev')"
createQuestionType(input: CreateQuestionTypeInput!): CreateQuestionType!
`

export const types = CreateQuestionTypeType

export const inputs = CreateQuestionTypeInput

export const Mutation = createQuestionTypeMutation
