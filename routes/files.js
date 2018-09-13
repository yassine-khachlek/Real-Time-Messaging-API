const express = require('express')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID
const fileModel = require('../models/files.js')

/* GET files */
router.get('/', function (req, res, next) {
  fileModel
    .find({})
    .sort({ _id: 1 })
    .skip(((req.query.page || 1) * 10) - 10)
    .limit(10)
    .exec(function (err, files) {
      if (err) throw new Error(err)
      return res.json(files)
    })
})

/* GET file */
router.get('/:id/:key?', function (req, res, next) {
  fileModel.findById(new ObjectId(req.params.id), function (err, file) {
    if (err) return res.status(500).json({ error: err })
    if (!file) return res.status(500).json({ error: err })

    var filePath = path.join(__dirname, '/..', '/storage/files/', file._id.toString())

    res.setHeader('Content-type', file.type)
    res.setHeader('Content-length', file.size)
    res.setHeader('Content-disposition', 'inline; filename=' + file.name)

    fs.createReadStream(filePath).pipe(res)
  })
})

/* POST file */
router.post('/', function (req, res, next) {
  var uploadDir = path.join(__dirname, '/..', '/storage/files/')

  var form = new formidable.IncomingForm()
  form.multiples = false
  form.keepExtensions = true
  form.uploadDir = uploadDir

  form.parse(req, (err, fields, files) => {
    if (err) throw new Error(err)

    var fileData = {
      name: files.file.name,
      size: files.file.size,
      type: files.file.type
    }

    fileModel.create(fileData, function (err, file) {
      if (err) {
        if (err) throw new Error(err)
      } else {
        fs.rename(files.file.path, path.join(__dirname, '/..', '/storage/files/', file._id.toString()), function (err) {
          if (err) throw new Error(err)
          res.json(file)
        })
      }
    })
  })

  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
})

/* DELETE file */
router.delete('/:id', function (req, res, next) {
  fileModel.findByIdAndRemove(new ObjectId(req.params.id), function (err, file) {
    if (err) return res.status(500).json({ error: err })
    if (!file) return res.status(500).json({ error: err })

    fs.unlink(path.join(__dirname, '/..', '/storage/files/', file._id.toString()), function (err) {
      if (err) return res.status(500).json({ error: err })

      return res.json(file)
    })
  })
})

module.exports = router
