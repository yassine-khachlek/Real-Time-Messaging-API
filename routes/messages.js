const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID
const messageModel = require('../models/messages.js')
const userModel = require('../models/users.js')
const auth = require('../middlewares/auth.js')

router.use(auth.check)

/* GET messages */
router.get('/', function (req, res, next) {
  const search = req.query.search ? JSON.parse(req.query.search) : {};

  const page = parseInt(req.query.page) || 1;

  const limitQuery = parseInt(req.query.limit);
  var limit = (limitQuery > 0 && limitQuery < 10) ? limitQuery : 10;

  const sortQuery = (req.query.sort ? req.query.sort : '_id:asc').split(':');
  const sortKey = sortQuery[0] ? sortQuery[0] : '_id';
  const sortValue = (sortQuery[1] && sortQuery[1] != 'asc') ? -1 : 1;
  var sort = {};
  sort[sortKey] = sortValue

  messageModel
    .find(search)
    .populate(['sender', 'receiver'])
    .sort(sort)
    .skip((page * limit) - limit)
    .limit(limit)
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

  userModel
    .findById(new ObjectId(req.body.sender))
    .exec(function (err, sender) {
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

      if (!sender) {
        return res.status(400).send({
          errors: [
            {
              status: 400,
              title: 'Bad Request'
            }
          ]
        })
      }

      userModel
        .findById(new ObjectId(req.body.receiver))
        .exec(function (err, receiver) {
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

          if (!receiver) {
            return res.status(400).send({
              errors: [
                {
                  status: 400,
                  title: 'Bad Request'
                }
              ]
            })
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

            message.sender = sender;
            message.receiver = receiver;

            return res.json({
              data: {
                type: 'messages',
                id: message._id,
                attributes: message
              }
            })
          })

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
