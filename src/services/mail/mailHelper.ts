import { sendEmail } from './sendgrid'
import { UserDocument } from '../../interfaces'
import { APP_NAME } from '../../utils/constants'

const { CONTACT_EMAIL } = process.env

const emailTextFooter =
  'Se você encontrou qualquer problema, por favor, entre em contato ' +
  `conosco em ${CONTACT_EMAIL}\n\nObrigado,\nA Equipe ${APP_NAME}`

export const sendRenewPasswordEmail = async (user: UserDocument)
: Promise<void> => {
  const from = { email: CONTACT_EMAIL, name: APP_NAME }

  const to = user.email

  const subject = `${APP_NAME} - Recuperação de senha`

  const text =
    'Foi feito um pedido para renovar sua senha. ' +
    'Se você não fez esse pedido, simplesmente ignore este email. ' +
    'Se você realmente fez o pedido, copie e cole o código abaixo ' +
    `no aplicativo ${APP_NAME}:\n\n` +
    `${user.renewPasswordCode}\n\n` +
    emailTextFooter

  await sendEmail({ from, to, subject, text })
}
