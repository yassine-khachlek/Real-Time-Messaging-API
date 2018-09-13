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
        data: files
      })
    })
})

/* GET file */
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
  fileModel.findById(new ObjectId(req.params.id), function (err, file) {
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

    if (!file) {
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
      data: file
    })
  })
})

router.get('/:id/:name', function (req, res, next) {
  fileModel.findById(new ObjectId(req.params.id), function (err, file) {
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

    if (!file) {
      return res.status(400).send({
        errors: [
          {
            status: 400,
            title: 'Bad Request'
          }
        ]
      })
    }

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

    if (!files.file) {
      return res.status(400).send({
        errors: [
          {
            status: 400,
            title: 'Bad Request'
          }
        ]
      })
    }

    var fileData = {
      name: files.file.name,
      size: files.file.size,
      type: files.file.type
    }

    fileModel.create(fileData, function (err, file) {
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

      fs.rename(files.file.path, path.join(__dirname, '/..', '/storage/files/', file._id.toString()), function (err) {
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

        res.json({
          data: file
        })
      })
    })
  })

  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
})

/* DELETE file */
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

  fileModel.findByIdAndRemove(new ObjectId(req.params.id), function (err, file) {
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

    if (!file) {
      return res.status(400).send({
        errors: [
          {
            status: 400,
            title: 'Bad Request'
          }
        ]
      })
    }

    fs.unlink(path.join(__dirname, '/..', '/storage/files/', file._id.toString()), function (err) {
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
        data: file
      })
    })
  })
})

module.exports = router
