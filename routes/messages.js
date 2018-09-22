const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID
const messageModel = require('../models/messages.js')
const auth = require('../middlewares/auth.js')

router.use(auth.check)

/* GET messages */
router.get('/', function (req, res, next) {
  messageModel
    .find({})
    .populate(['sender', 'receiver'])
    .sort({ _id: -1 })
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

/* GET message */
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

  messageModel
    .findById(new ObjectId(req.params.id))
    .populate(['sender', 'receiver'])
    .exec(function (err, message) {
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

      if (!message) {
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
          type: 'messages',
          id: message._id,
          attributes: message
        }
      })
    })
})

/* POST message */
router.post('/', function (req, res, next) {
  var messageData = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    content: req.body.content
  }

  messageModel.create(messageData, function (err, message) {
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

    req.app.get('io').to(messageData.receiver).emit('*', {
      name: 'messages.create',
      status: 200,
      data: {
        type: 'messages',
        id: message._id,
        attributes: message
      }
    })

    return res.json({
      data: {
        type: 'messages',
        id: message._id,
        attributes: message
      }
    })
  })
})

/* DELETE message */
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

  messageModel.findByIdAndRemove(new ObjectId(req.params.id), function (err, message) {
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

    if (!message) {
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
        type: 'messages',
        id: message._id,
        attributes: message
      }
    })
  })
})

module.exports = router
