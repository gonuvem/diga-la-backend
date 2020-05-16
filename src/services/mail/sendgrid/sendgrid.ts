/**
 * NPM: https://www.npmjs.com/package/@sendgrid/mail
 * Repositório: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
 * Exemplos: https://github.com/sendgrid/sendgrid-nodejs/blob/master/use-cases/README.md#email-use-cases
 */
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SG_API_KEY)

export default sgMail
