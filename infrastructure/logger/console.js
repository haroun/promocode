const debug = (...args) => console.debug(...args)
const info = (...args) => console.info(...args)
const warning = (...args) => console.warn(...args)
const error = (...args) => console.error(...args)

const logger = {
  debug,
  info,
  warning,
  error
}

module.exports = logger
