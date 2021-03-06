import { Role } from '../../enums';

/**
 * Determina os papéis que podem acessar uma operação grapqhl
 * @example { createUser: [Role.Dev, Role.Admin] }
 */
export const gqlRouter: { [resolverName: string]: Role[] } = {
  readOwnProfile: [Role.Client],
  updateOwnProfile: [Role.Client],

  createClient: [Role.Dev],
  updateClient: [Role.Dev],
  deleteClient: [Role.Dev],
  listClients: [Role.Dev],
  readClient: [Role.Dev],

  createOwnForm: [Role.Client],
  updateOwnForm: [Role.Client],
  deleteOwnForm: [Role.Client],
  listOwnForms: [Role.Client],
  readOwnForm: [Role.Client],

  createQuestionType: [Role.Dev],
  updateQuestionType: [Role.Dev],
  deleteQuestionType: [Role.Dev],

  createOwnQuestion: [Role.Client],
  updateOwnQuestion: [Role.Client],
  deleteOwnQuestion: [Role.Client],
  listOwnQuestions: [Role.Client],
  readOwnQuestion: [Role.Client],
  createOwnQuestions: [Role.Client],
  updateOwnQuestions: [Role.Client],

  listOwnResponses: [Role.Client],
  readOwnResponse: [Role.Client],
  getChartsData: [Role.Client],
};
