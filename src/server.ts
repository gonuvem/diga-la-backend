import { AddressInfo } from 'net'

import app from './app'

const { PORT } = process.env

const server = app.listen(PORT, () => {
  const { address, port } = server.address() as AddressInfo
  console.log('Server is running in PORT: ' + PORT)
  console.debug(
    `[${process.env.NODE_ENV}] listening to ${address} on port ${port}`
  )
})

const closeServer = function (): void {
  server.close(() => {
    console.log('Connection Closed')
    process.exit(0)
  })

  setTimeout(() => {
    console.log('shutting down')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', closeServer)
process.on('SIGINT', closeServer)

import('./db')
