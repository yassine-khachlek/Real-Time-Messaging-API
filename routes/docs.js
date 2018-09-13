var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var docs = {
    title: 'Documentations',
    endpoints: [
      {
        name: 'authentication',
        endpoints: [
          {
            name: 'register',
            url: '/auth/register',
            method: 'POST',
            params: [
              {
                name: 'username',
                type: 'String',
                description: 'An Email',
                required: true
              },
              {
                name: 'password',
                type: 'String',
                description: 'A password',
                required: true
              }
            ]
          },
          {
            name: 'login',
            url: '/auth/login',
            method: 'POST'
          },
          {
            name: 'token verify',
            url: '/auth/token/verify',
            method: 'GET'
          }
        ]
      },
      {
        name: 'files',
        endpoints: [
          {
            name: 'PAGINATE',
            url: '/files',
            method: 'GET'
          },
          {
            name: 'READ',
            url: '/files/:id',
            method: 'GET'
          },
          {
            name: 'SERVE',
            url: '/files/:id/:name',
            method: 'GET'
          },
          {
            name: 'CREATE',
            url: '/files',
            method: 'POST'
          },
          {
            name: 'DELETE',
            url: '/files/:id',
            method: 'DELETE'
          }
        ]
      },
      {
        name: 'messages',
        endpoints: [
          {
            name: 'PAGINATE',
            url: '/messages',
            method: 'GET'
          },
          {
            name: 'READ',
            url: '/messages/:id',
            method: 'GET'
          },
          {
            name: 'CREATE',
            url: '/messages',
            method: 'POST'
          },
          {
            name: 'DELETE',
            url: '/messages/:id',
            method: 'DELETE'
          }
        ]
      },
      {
        name: 'users',
        endpoints: [
          {
            name: 'PAGINATE',
            url: '/users',
            method: 'GET'
          },
          {
            name: 'READ',
            url: '/users/:id',
            method: 'GET'
          },
          {
            name: 'DELETE',
            url: '/messages/:id',
            method: 'DELETE'
          }
        ]
      }
    ]
  }

  res.render('docs', docs)
})

module.exports = router
