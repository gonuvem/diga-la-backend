import { FormDocument } from '../../../interfaces'
import { fetchAllQuestions } from '../../../services/models/QuestionService'
import { isEmptyArray } from '../../../utils/general'

export async function getFormNumPages (form: FormDocument): Promise<number> {
  const questions = await fetchAllQuestions({
    conditions: { form: form._id },
    sort: '-formPage',
    projection: 'form formPage'
  }).limit(1)

  return isEmptyArray(questions) ? 0 : questions[0].formPage
}
