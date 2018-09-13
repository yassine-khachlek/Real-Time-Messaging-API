const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const ObjectId = require('mongodb').ObjectID
const auth = require('../middlewares/auth.js')
const userModel = require('../models/users.js')

/* POST auth register */
router.post('/register', function (req, res, next) {
  var userData = {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture ? new ObjectId(req.body.picture) : null,
    password: req.body.password ? crypto.createHash('md5').update(req.body.password).digest('hex') : null
  }

  userModel.create(userData, function (err, user) {
    if (err) throw new Error(err)
    return res.json(user)
  })
})

/* POST auth login */
router.post('/login', auth.authenticate, (req, res) => {
  res.json({ token: req.user })
})

router.get('/token/verify', auth.check, (req, res) => {
  res.json(req.user)
})

module.exports = router
