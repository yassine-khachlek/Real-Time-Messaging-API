const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID
const userModel = require('../models/users.js')
const messageModel = require('../models/messages.js')
const auth = require('../middlewares/auth.js')

router.use(auth.check)

/* GET users */
router.get('/', function (req, res, next) {
  userModel
    .find({})
    .sort({ _id: 1 })
    .skip(((req.query.page || 1) * 10) - 10)
    .limit(10)
    .exec(function (err, users) {
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

      users = users.map(function (user) {
        return {
          type: 'users',
          id: user._id,
          attributes: user
        }
      })

      return res.json({
        data: users
      })
    })
})

/* GET user */
router.get('/:id', function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      errors: [
        {
          status: 400,
          title: 'Bad Request'
        }
      ]
    })
  }

  userModel.findById(new ObjectId(req.params.id), function (err, user) {
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

    if (!user) {
      return res.status(400).send({
        errors: [
          {
            status: 400,
            title: 'Bad Request'
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

/* GET user messages */
router.get('/:id/messages', function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      errors: [
        {
          status: 400,
          title: 'Bad Request'
        }
      ]
    })
  }
  
  messageModel
    .find({receiver: new ObjectId(req.params.id)})
    .populate(['sender', 'receiver'])
    .sort({ _id: 1 })
    .skip(((req.query.page || 1) * 10) - 10)
    .limit(10)
    .exec(function (err, messages) {
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

      messages = messages.map(function (message) {
        return {
          type: 'messages',
          id: message._id,
          attributes: message
        }
      })

      return res.json({
        data: messages
      })
    })
})

/* DELETE user */
router.delete('/:id', function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      errors: [
        {
          status: 400,
          title: 'Bad Request'
        }
      ]
    })
  }

  userModel.findByIdAndRemove(new ObjectId(req.params.id), function (err, user) {
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

    if (!user) {
      return res.status(400).send({
        errors: [
          {
            status: 400,
            title: 'Bad Request'
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

module.exports = router
