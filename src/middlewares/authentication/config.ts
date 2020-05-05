export default {
  JWT_SECRET: process.env.JWT_SECRET,
  options: {
    expiresIn: '7 days',
    issuer: 'contato@gonuvem.com'
  }
}
