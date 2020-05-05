import morgan from 'morgan'

import winston from './winston'

// create a stream object with a 'write' function that will be used by `morgan`
const options = {
  stream: {
    write: (message: string): void => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
      winston.info(message)
    }
  }
}

const logger = morgan('combined', options)

export default logger
