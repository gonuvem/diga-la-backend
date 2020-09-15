const ResponseData = `
"Objeto com dados das respostas."
type ResponseData {
  id: String
  day: String
  label: String
  respostas: Int
  value: Int
}
`;

const ChartDataType = `
"Dados de um gráfico."
type ChartData {
  type: String!
  name: String!
  data: [ResponseData!]
}
`;

const GetChartsDataType = `
"Resposta da query que retorna os dados dos gráficos das respostas de uma pesquisa do cliente logado"
type GetChartsData {
  data: [ChartData!]
  """
  | internalCode | statusCode | message/Descrição                                            |
  | :----------- | :--------: | ------------------------------------------------------------ |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back.  |
  | 610          |    403     | Token inválido                                               |
  | 611          |    401     | Cabeçalho de autorização inválido                            |
  | 700          |    404     | Usuário não encontrado                                       |
  | 620          |    403     | Este usuário não possui permissão para esta ação             |
  | 630          |    400     | Erro na validação. Veja error.message                        |
  | 711          |    404     | Cliente não encontrado                                       |
  | 721          |    404     | Pesquisa não encontrada                                      |
  """
  error: MyError
}
`;

const getChartsDataQuery = `
"Obtém os dados dos gráficos das respostas de uma pesquisa do cliente logado. APENAS PARA ('client')"
getChartsData(
  "ID da pesquisa. Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): GetChartsData!
`;

export const types = `
${ResponseData}
${ChartDataType}
${GetChartsDataType}
`;

export const Query = getChartsDataQuery;
