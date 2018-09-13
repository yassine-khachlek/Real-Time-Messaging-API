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
    if (err) {
      return res.status(500).send({
        errors: [
          {
            status: 500,
            title: 'Internal Server Error'
          }
        ]
      })
    }

    return res.json({
      data: {
        type: 'users',
        id: user._id,
        attributes: user
      }
    })
  })
})

/* POST auth login */
router.post('/login', auth.authenticate, (req, res) => {
  res.json({
    status: 200,
    data: {
      type: 'tokens',
      attributes: {
        value: req.user
      }
    }
  })
})

router.get('/token/verify', auth.check, (req, res) => {
  res.json({
    data: {
      type: 'users',
      id: req.user._id,
      attributes: req.user
    }
  })
})

module.exports = router
