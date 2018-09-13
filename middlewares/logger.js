var logger = require('morgan')

logger.token('remote-user', function getRemoteUserToken (req) {
  return req.user ? req.user.email : undefined
})

module.exports = logger
