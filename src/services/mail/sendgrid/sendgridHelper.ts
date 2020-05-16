import { MailDataRequired } from '@sendgrid/helpers/classes/mail'

import sendgrid from './sendgrid'
import { SENDGRID_ERROR } from '../../../middlewares/errorHandling/errors'

export const sendEmail = async (msg: MailDataRequired): Promise<void> => {
  try {
    await sendgrid.send(msg)
  } catch (error) {
    // Log friendly error
    console.error(error.toString())

    // // Extract error msg
    // const { message, code, response } = error

    // // Extract response msg
    // const { headers, body } = response

    throw SENDGRID_ERROR
  }
}
