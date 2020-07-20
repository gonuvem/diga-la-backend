/* eslint-disable max-lines */
const NumberConfigType = `
"Número"
input NumberConfigInput {
  "Valor booleano"
  hasMaxMinLimit: Boolean!
  maxValue: Int
  minValue: Int
  "Mínimo: 1"
  incValue: Int
}
`;

const AnswerOptionType = `
"Opção de resposta"
input AnswerOptionInput {
  "Mínimo: 1 caracter"
  text: String!
  "Formato de url válido"
  image: String
}
`;

const CheckBoxConfigType = `
"Checkbox - escolha múltipla"
input CheckBoxConfigInput {
  "Valor booleano"
  hasHorizontalAlignment: Boolean!
  "Valor booleano"
  hasRandomResponsesOrder: Boolean!
  answerOptions: [AnswerOptionInput!]!
}
`;

const EmailConfigType = `
"Email"
input EmailConfigInput {
  "Valor booleano"
  hasValidation: Boolean!
}
`;

const PhoneConfigType = `
"Telefone"
input PhoneConfigInput {
  "Valor booleano"
  hasValidation: Boolean!
}
`;

const LinkConfigType = `
"Link"
input LinkConfigInput {
  "Valor booleano"
  hasValidation: Boolean!
}
`;

const ImageChoiceConfigType = `
"Escolha entre imagens"
input ImageChoiceConfigInput {
  "Valor booleano"
  isMultipleChoice: Boolean!
  "Mínimo: 1"
  maxChoices: Int
  "Valor booleano"
  hasRandomResponsesOrder: Boolean!
  answerOptions: [AnswerOptionInput!]!
}
`;

const ShortTextConfigType = `
"Texto curto"
input ShortTextConfigInput {
  "Mínimo: 1 caracter"
  placeholder: String
  "Valor booleano"
  hasLimitedChars: Boolean!
  "Mínimo: 1"
  maxChars: Int
}
`;

const NPSConfigType = `
"NPS"
input NPSConfigInput {
  "Valor booleano"
  canDisplayLabels: Boolean!
  "Mínimo: 1 caracter"
  leftLabel: String
  "Mínimo: 1 caracter"
  rightLabel: String
  "Valor booleano"
  canStartAtZero: Boolean!
  "Mínimo: 1 caracter"
  escale: String!
}
`;

const DateConfigType = `
"Data e hora"
input DateConfigInput {
  "Valor booleano"
  isDateRequired: Boolean!
  "Mínimo: 1 caracter"
  dateFormat: String
  "Valor booleano"
  isTimeRequired: Boolean!
  "Mínimo: 1 caracter"
  timeFormat: String
  "Valor booleano"
  canCaptureInterval: Boolean!
}
`;

const DropDownConfigType = `
"Dropdown"
input DropDownConfigInput {
  "Valor booleano"
  hasRandomResponsesOrder: Boolean!
  answerOptions: [AnswerOptionInput!]!
}
`;

const MatrixConfigType = `
"Matriz de escolhas"
input MatrixConfigInput {
  "Valor booleano"
  isMultipleChoice: Boolean!
  "Mínimo: 1 caracter"
  rowsLabels: [String]!
  "Mínimo: 1 caracter"
  colsLabels: [String]!
}
`;

const SliderConfigType = `
"Slider"
input SliderConfigInput {
  "Limite inferior"
  minValue: Int!
  "Mínimo: 1 caracter"
  minLabel: String
  "Limite superior"
  maxValue: Int!
  "Mínimo: 1 caracter"
  maxLabel: String
  "Mínimo: 1"
  incValue: Int!
  "Valor booleano"
  canHideValue: Boolean!
}
`;

const LongTextConfigType = `
"Texto longo"
input LongTextConfigInput {
  "Mínimo: 1 caracter"
  placeholder: String
  "Valor booleano"
  hasLimitedChars: Boolean!
  "Mínimo: 1"
  maxChars: Int
}
`;

const RadioButtonConfigType = `
"Radiobutton - escolha única"
input RadioButtonConfigInput {
  "Valor booleano"
  hasHorizontalAlignment: Boolean!
  "Valor booleano"
  hasRandomResponsesOrder: Boolean!
  answerOptions: [AnswerOptionInput!]!
}
`;

const SortListConfigType = `
"Ordenar respostas"
input SortListConfigInput {
  "Valor booleano"
  hasRandomResponsesOrder: Boolean!
  answerOptions: [AnswerOptionInput!]!
}
`;

const QuestionConfigInput = `
"Parâmetros das configurações de uma questão"
input QuestionConfigInput {
  "Mínimo: 1 caracter"
  name: String!
  "Mínimo: 1 caracter"
  description: String
  "Valor booleano"
  isRequired: Boolean!
  checkBox: CheckBoxConfigInput
  date: DateConfigInput
  dropDown: DropDownConfigInput
  email: EmailConfigInput
  imageChoice: ImageChoiceConfigInput
  link: LinkConfigInput
  longText: LongTextConfigInput
  matrix: MatrixConfigInput
  nps: NPSConfigInput
  number: NumberConfigInput
  phone: PhoneConfigInput
  radioButton: RadioButtonConfigInput
  shortText: ShortTextConfigInput
  slider: SliderConfigInput
  sortList: SortListConfigInput
}
`;

const CreateOwnQuestionInput = `
"Parâmetros para criar uma questão do cliente logado."
input CreateOwnQuestionInput {
  "Regex: /^[0-9a-fA-F]{24}$/"
  form: ID!
  "Regex: /^[0-9a-fA-F]{24}$/"
  type: ID!
  "Mínimo: 1"
  formPage: Int!
  config: QuestionConfigInput!
}
`;

const CreateOwnQuestionType = `
"Resposta da mutation que cria uma questão do cliente logado"
type CreateOwnQuestion {
  "Questão criada"
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
  | 721          |    404     | Pesquisa não encontrada                                     |
  | 731          |    404     | Tipo de questão não encontrado                              |
  """
  error: MyError
}
`;

const createOwnQuestionMutation = `
"Cria uma questão do cliente logado. APENAS PARA ('client')"
createOwnQuestion(input: CreateOwnQuestionInput!): CreateOwnQuestion!
`;

export const types = `
${CreateOwnQuestionType}
`;

export const inputs = `
${NumberConfigType}
${AnswerOptionType}
${CheckBoxConfigType}
${EmailConfigType}
${PhoneConfigType}
${LinkConfigType}
${ImageChoiceConfigType}
${ShortTextConfigType}
${NPSConfigType}
${DateConfigType}
${DropDownConfigType}
${MatrixConfigType}
${SliderConfigType}
${LongTextConfigType}
${RadioButtonConfigType}
${SortListConfigType}
${QuestionConfigInput}
${CreateOwnQuestionInput}
`;

export const Mutation = createOwnQuestionMutation;
