var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    'jsonapi': {
      'version': '1.0'
    },
    'meta': {
      'authors': [
        'Yassine Khachlek'
      ],
      'documentation': process.env.APP_URL + '/docs'
    }
  })
})

module.exports = router
