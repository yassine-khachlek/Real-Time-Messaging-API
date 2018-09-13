const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID
const userModel = require('../models/users.js')
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
      if (err) throw new Error(err)
      return res.json(users)
    })
})

/* GET user */
router.get('/:id', function (req, res, next) {
  userModel.findById(new ObjectId(req.params.id), function (err, user) {
    if (err) throw new Error(err)
    return res.json(user)
  })
})

/* DELETE user */
router.delete('/:id', function (req, res, next) {
  userModel.findByIdAndRemove(new ObjectId(req.params.id), function (err, user) {
    if (err) throw new Error(err)
    return res.json(user)
  })
})

module.exports = router
