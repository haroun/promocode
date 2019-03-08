const logger = client => ({
  debug: (...args) => client.debug(...args),
  info: (...args) => client.info(...args),
  warning: (...args) => client.warning(...args),
  error: (...args) => client.error(...args)
})

module.exports = logger
