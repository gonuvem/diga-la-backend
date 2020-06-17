import Dataloader from 'dataloader'

import { QuestionDocument, FormDocument } from '../../../interfaces'
import { FormQuestionsDataLoader } from '../../../types'
import { fetchAllQuestions } from '../../../services/models/QuestionService'
import { getProperty, groupBy } from '../../../utils/general'

async function getFormQuestions (forms: FormDocument[])
: Promise<QuestionDocument[][]> {
  const formsIds = forms.map(getProperty('_id'))

  const questions = await fetchAllQuestions({
    conditions: { form: { $in: formsIds } }
  })

  const questionsGroupedByForm = groupBy(questions, 'form')

  return formsIds.map(formId => questionsGroupedByForm[formId] || [])
}

export function getFormQuestionsDataLoader (): FormQuestionsDataLoader {
  return new Dataloader(getFormQuestions)
}
