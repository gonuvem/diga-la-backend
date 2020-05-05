import express from 'express'
import cors from 'cors'
import compression from 'compression'

import './env'
import './sentry'
import { gqlServer, gqlCors } from './graphql'
import handleError from './middlewares/errorHandling'

const app = express()

app.use(cors())

app.use(compression())

app.use(express.json({ limit: '60mb' }))

app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => { return res.json({ message: 'DIG API' }) })

gqlServer.applyMiddleware({ app, cors: gqlCors })

app.use(handleError)

export default app
