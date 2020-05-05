import appRoot from 'app-root-path'
import Winston from 'winston'

/**
 * Adaptado de:
 * https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
 */

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

// instantiate a new Winston Logger with the settings defined above
const winston = Winston.createLogger({
  transports: [
    new Winston.transports.File(options.file),
    new Winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

export default winston
