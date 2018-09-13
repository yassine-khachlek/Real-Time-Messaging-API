const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const crypto = require('crypto')
const userModel = require('../models/users.js')
const jwt = require('jsonwebtoken')

passport.use(new LocalStrategy((username, password, done) => {
  userModel.findOne({
    email: username,
    password: crypto.createHash('md5').update(password).digest('hex')
  }, {
    password: false,
    __v: false
  }, function (err, user) {
    if (err || !user) {
      done(null, false)
      return
    }
    done(null, jwt.sign(user.toObject(), process.env.JWT_KEY, { expiresIn: process.env.JWT_EXP }))
  })
}))

passport.use(new BearerStrategy((token, done) => {
  try {
    const user = jwt.verify(token, process.env.JWT_KEY)
    if (user._id) {
      done(null, user)
      return
    }
    done(null, false)
  } catch (error) {
    done(null, false)
  }
}))

module.exports = {
  authenticate: passport.authenticate('local', { session: false }),
  check: passport.authenticate('bearer', { session: false }),
  socket: function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, process.env.JWT_KEY, function (err, decoded) {
        if (err) return next(err)
        socket.decoded = decoded
        next()
      })
    } else {
      next()
    }
  }
}
