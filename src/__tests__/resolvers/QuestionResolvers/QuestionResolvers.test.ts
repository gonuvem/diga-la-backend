import createOwnQuestionTest from './createOwnQuestionTest';
import updateOwnQuestionTest from './updateOwnQuestionTest';
import deleteOwnQuestionTest from './deleteOwnQuestionTest';
import listOwnQuestionsTest from './listOwnQuestionsTest';
import readOwnQuestionTest from './readOwnQuestionTest';
import createOwnQuestionsTest from './createOwnQuestionsTest';
import updateOwnQuestionsTest from './updateOwnQuestionsTest';

describe('Test Question Resolvers', () => {
  describe('Test createOwnQuestion', createOwnQuestionTest);

  describe('Test updateOwnQuestion', updateOwnQuestionTest);

  describe('Test deleteOwnQuestion', deleteOwnQuestionTest);

  describe('Test listOwnQuestionsTest', listOwnQuestionsTest);

  describe('Test readOwnQuestion', readOwnQuestionTest);

  describe('Test createOwnQuestions', createOwnQuestionsTest);

  describe('Test updateOwnQuestions', updateOwnQuestionsTest);
});
