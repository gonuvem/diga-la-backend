import { Types } from 'mongoose';

import { UserDocument } from '../../../interfaces';
import { UpdateOwnQuestionsInput } from '../../../types';
import { fetchOneClient } from '../../../services/models/ClientService';
import {
  bulkWriteQuestions,
  checkIfQuestionExists,
} from '../../../services/models/QuestionService';
import { fetchOneForm } from '../../../services/models/FormService';
import { checkIfQuestionTypesExists } from '../../../services/models/QuestionTypeService';
import { getProperty } from '../../../utils/general';

// eslint-disable-next-line max-lines-per-function
export async function updateOwnQuestions(
  user: UserDocument,
  { questions, form }: UpdateOwnQuestionsInput
): Promise<{}> {
  const client = await fetchOneClient({ conditions: { user: user._id } });

  const [formFound, ,] = await Promise.all([
    fetchOneForm({ conditions: { _id: form, client: client._id } }),
    checkIfQuestionTypesExists(questions.map(getProperty('type'))),
    checkIfQuestionExists(questions.map(getProperty('_id'))),
  ]);

  const questionsWithForm = questions.map(question => ({
    ...question,
    form: formFound._id,
  }));

  await bulkWriteQuestions(
    questionsWithForm.map(question => {
      const { _id, config, ...updateData } = question;

      return {
        updateOne: {
          filter: { _id: Types.ObjectId(_id as string) },
          update: { ...updateData, config: Object.assign({}, config) },
        },
      };
    })
  );

  return {};
}
