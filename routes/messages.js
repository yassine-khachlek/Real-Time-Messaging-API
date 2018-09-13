const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID
const messageModel = require('../models/messages.js')

/* GET messages */
router.get('/', function (req, res, next) {
  messageModel
    .find({})
    .populate(['sender', 'receiver'])
    .sort({ _id: 1 })
    .skip(((req.query.page || 1) * 10) - 10)
    .limit(10)
    .exec(function (err, messages) {
      if (err) throw new Error(err)
      return res.json(messages)
    })
})

/* GET message */
router.get('/:id', function (req, res, next) {
  messageModel
    .findById(new ObjectId(req.params.id))
    .populate(['sender', 'receiver'])
    .exec(function (err, message) {
      if (err) throw new Error(err)
      return res.json(message)
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
    if (err) throw new Error(err)
    req.app.get('io').to(messageData.receiver).emit('event', {
      name: 'message.create',
      status: 'created',
      data: {
        message: message
      }
    })
    return res.json(message)
  })
})

/* DELETE message */
router.delete('/:id', function (req, res, next) {
  messageModel.findByIdAndRemove(new ObjectId(req.params.id), function (err, message) {
    if (err) throw new Error(err)
    return res.json(message)
  })
})

module.exports = router
