const express = require('express')
const bodyParser = require('body-parser')
const consoleLogger = require('../../infrastructure/logger/console')
const logger = require('../../application/logger')(consoleLogger)
const routes = require('./routes')

const PORT = process.env.PORT || 8000

const start = () => {
  const app = express()
  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(routes)

  const server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))

  // Avoid dropping requests with 502s when restarting workers
  process.on('SIGTERM', () => {
    logger.info('Closing...')
    if (server) {
      server.close()
    }

    process.exit(0)
  })
}

module.exports.start = start
