/* eslint-disable max-lines-per-function */
import { getProperty, groupBy, isEmptyArray } from '../../../utils/general';
import {
  Answer,
  ChartData,
  CheckBoxConfig,
  DateConfig,
  ImageChoiceConfig,
  NPSConfig,
  QuestionTypeDocument,
  RadioButtonConfig,
  ResponseDocument,
  UserDocument,
} from '../../../interfaces';
import { fetchOneClient } from '../../../services/models/ClientService';
import { fetchAllResponses } from '../../../services/models/ResponseService';
import { fetchAllQuestions } from '../../../services/models/QuestionService';
import { QuestionTypeAlias } from '../../../enums';
import { ID } from '../../../types';

const createImageChoiceChartData = (
  config: ImageChoiceConfig,
  answers: Answer[]
): ChartData => {
  const hasAnswerId = (id: ID) => (answer: Answer): boolean =>
    answer.imageChoice.includes(id.toString());

  return {
    type: 'radarImage',
    name: 'Escolha de imagem',
    data: config.answerOptions.map(({ _id, text }) => ({
      label: text,
      respostas: answers.filter(hasAnswerId(_id)).length,
    })),
  };
};

/**
 * No calendário enviar ordenado por data se for possível
 */
const createDateChartData = (
  config: DateConfig,
  answers: Answer[]
): ChartData => {
  const dates = answers
    .flatMap(answer => answer.date)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const uniqueDates = [...new Set(dates)];

  return {
    type: 'calendar',
    name: 'Data',
    data: uniqueDates.map(date => ({
      day: date.toISOString(),
      value: answers.filter(answer => answer.date.includes(date)).length,
    })),
  };
};

const createNPSChartData = (
  config: NPSConfig,
  answers: Answer[]
): ChartData => {
  /** @see https://rockcontent.com/br/blog/nps/ */
  const clients = answers.reduce(
    (prev, curr) => {
      return prev;
    },
    {
      promoters: 0,
      detractors: 0,
      passives: 0,
    }
  );

  const total = answers.length;
  const nps = (clients.promoters / total - clients.detractors / total) * 100;

  const classification = [
    { name: 'Excelente', min: 75, max: 100 },
    { name: 'Muito bom', min: 50, max: 74 },
    { name: 'Razoável', min: 0, max: 49 },
    { name: 'Ruim', min: -100, max: -1 },
  ];

  return {
    type: 'barRace',
    name: 'NPS',
    data: [
      {
        id: 'Pouca aprovação',
        value: 24,
      },
      {
        id: 'Media aprovação',
        value: 34,
      },
      {
        id: 'Muita aprovação',
        value: 14,
      },
    ],
  };
};

const createCheckBoxChartData = (
  config: CheckBoxConfig,
  answers: Answer[]
): ChartData => {
  const hasAnswerId = (id: ID) => (answer: Answer): boolean =>
    answer.checkBox.includes(id.toString());

  return {
    type: 'radar',
    name: 'Múltipla Escolha',
    data: config.answerOptions.map(({ _id, text }) => ({
      label: text,
      respostas: answers.filter(hasAnswerId(_id)).length,
    })),
  };
};

const createRadioButtonChartData = (
  config: RadioButtonConfig,
  answers: Answer[]
): ChartData => {
  const hasAnswerId = (id: ID) => (answer: Answer): boolean =>
    answer.radioButton.includes(id.toString());

  return {
    type: 'pie',
    name: 'Escolha única',
    data: config.answerOptions.map(({ _id, text }) => ({
      id: text,
      value: answers.filter(hasAnswerId(_id)).length,
    })),
  };
};

const mountChartsData = async (
  responses: ResponseDocument[]
): Promise<ChartData[]> => {
  // Agrupar respostas por questão
  const allAnswersAndQuestions = responses.flatMap(
    response => response.answersAndQuestions
  );

  const groupedResponsesByQuestions = groupBy(
    allAnswersAndQuestions,
    'question'
  );

  // Obter todas as questões e seus tipos
  const questionsIds = Object.keys(groupedResponsesByQuestions);
  const questions = await fetchAllQuestions({
    conditions: { _id: { $in: questionsIds } },
    projection: 'type config',
  }).populate('type');

  const chartsData = questions.map(question => {
    const type = question.type as QuestionTypeDocument;
    const answers = groupedResponsesByQuestions[question._id].map(
      getProperty('answer')
    );

    switch (type.alias) {
      case QuestionTypeAlias.ImageChoice:
        return createImageChoiceChartData(question.config.imageChoice, answers);
      case QuestionTypeAlias.CheckBox:
        return createCheckBoxChartData(question.config.checkBox, answers);
      case QuestionTypeAlias.NPS:
        return createNPSChartData(question.config.nps, answers);
      case QuestionTypeAlias.RadioButton:
        return createRadioButtonChartData(question.config.radioButton, answers);
      case QuestionTypeAlias.Date:
        return createDateChartData(question.config.date, answers);
      default:
        return { type: 'Não implementado', name: 'Não implementado', data: [] };
    }
  });

  return chartsData;
};

export async function getChartsData(
  user: UserDocument,
  { id }: { id: string }
): Promise<{ data: ChartData[] }> {
  await fetchOneClient({ conditions: { user: user._id } });

  const responses = await fetchAllResponses({ conditions: { form: id } });

  if (isEmptyArray(responses)) return { data: [] };

  const chartsData = await mountChartsData(responses);

  return { data: chartsData };
}
