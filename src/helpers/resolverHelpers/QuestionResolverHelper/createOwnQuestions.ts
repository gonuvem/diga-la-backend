import { QuestionDocument, UserDocument } from '../../../interfaces';
import { CreateOwnQuestionsInput } from '../../../types';
import { fetchOneClient } from '../../../services/models/ClientService';
import { createManyQuestions } from '../../../services/models/QuestionService';
import { fetchOneForm } from '../../../services/models/FormService';
import { checkIfQuestionTypesExists } from '../../../services/models/QuestionTypeService';
import { getProperty } from '../../../utils/general';

// eslint-disable-next-line max-lines-per-function
export async function createOwnQuestions(
  user: UserDocument,
  { questions, form }: CreateOwnQuestionsInput
): Promise<{ questions: QuestionDocument[] }> {
  const client = await fetchOneClient({ conditions: { user: user._id } });

  const [formFound, _] = await Promise.all([
    fetchOneForm({ conditions: { _id: form, client: client._id } }),
    checkIfQuestionTypesExists(questions.map(getProperty('type'))),
  ]);

  const questionsWithForm = questions.map(question => ({
    ...question,
    form: formFound._id,
  }));

  const questionsCreated = await createManyQuestions({
    docs: questionsWithForm,
  });

  return { questions: questionsCreated };
}
