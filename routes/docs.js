var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var docs = {
    title: 'Documentations',
    app_url: process.env.APP_URL,
    groups: [
      {
        name: 'authentication',
        endpoints: [
          {
            name: 'register',
            url: '/auth/register',
            method: 'POST',
            params: [
              {
                name: 'name',
                type: 'String',
                description: 'The user name',
                required: true
              },
              {
                name: 'username',
                type: 'String',
                description: 'The user email',
                required: true
              },
              {
                name: 'password',
                type: 'String',
                description: 'The user password',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'users',
                    'id': '5b9b8f2cc3ac3343e4f1db33',
                    'attributes': {
                      'picture': null,
                      '_id': '5b9b8f2cc3ac3343e4f1db33',
                      'name': 'Yassine Khachlek',
                      'email': 'yassine.khachlek@gmail.comx',
                      'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                      'created_at': '2018-09-14T10:36:28.019Z',
                      'updated_at': '2018-09-14T10:36:28.019Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'login',
            url: '/auth/login',
            method: 'POST',
            params: [
              {
                name: 'username',
                type: 'String',
                description: 'The user email',
                required: true
              },
              {
                name: 'password',
                type: 'String',
                description: 'The user password',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'status': 200,
                  'data': {
                    'type': 'tokens',
                    'attributes': {
                      'value': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaWN0dXJlIjpudWxsLCJfaWQiOiI1YjliODE2MDU2MDI3MjI1YWZ...'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'token verify',
            url: '/auth/token/verify',
            method: 'GET',
            headers: [
              {
                name: 'Authorization',
                type: 'String',
                description: 'The user token',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'users',
                    'id': '5b9b816056027225afbdd746',
                    'attributes': {
                      'picture': null,
                      '_id': '5b9b816056027225afbdd746',
                      'name': 'Yassine Khachlek',
                      'email': 'yassine.khachlek@gmail.com',
                      'created_at': '2018-09-14T09:37:36.653Z',
                      'updated_at': '2018-09-14T09:37:36.653Z',
                      'iat': 1536918198,
                      'exp': 1568454198
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        name: 'files',
        endpoints: [
          {
            name: 'PAGINATE',
            url: '/files',
            method: 'GET',
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': [
                    {
                      'type': 'files',
                      'id': '5b9a5f435bb024768314956d',
                      'attributes': {
                        '_id': '5b9a5f435bb024768314956d',
                        'name': 'picture.png',
                        'size': 7841,
                        'type': 'image/png',
                        'created_at': '2018-09-13T12:59:47.170Z',
                        'updated_at': '2018-09-13T12:59:47.170Z',
                        '__v': 0
                      }
                    },
                    {
                      'type': 'files',
                      'id': '5b9a5f70665ba376dc985111',
                      'attributes': {
                        '_id': '5b9a5f70665ba376dc985111',
                        'name': 'picture.png',
                        'size': 7841,
                        'type': 'image/png',
                        'created_at': '2018-09-13T13:00:32.346Z',
                        'updated_at': '2018-09-13T13:00:32.346Z',
                        '__v': 0
                      }
                    },
                    {
                      'type': 'files',
                      'id': '5b9a5f81d1da187712744c9d',
                      'attributes': {
                        '_id': '5b9a5f81d1da187712744c9d',
                        'name': 'picture.png',
                        'size': 7841,
                        'type': 'image/png',
                        'created_at': '2018-09-13T13:00:49.173Z',
                        'updated_at': '2018-09-13T13:00:49.173Z',
                        '__v': 0
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            name: 'READ',
            url: '/files/:id',
            method: 'GET',
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'files',
                    'id': '5b9b9276d0a16c4af7cfd461',
                    'attributes': {
                      '_id': '5b9b9276d0a16c4af7cfd461',
                      'name': 'picture.png',
                      'size': 7841,
                      'type': 'image/png',
                      'created_at': '2018-09-14T10:50:30.174Z',
                      'updated_at': '2018-09-14T10:50:30.174Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'SERVE',
            url: '/files/:id/:name',
            method: 'GET',
            params: [
              {
                name: ':id',
                type: 'String',
                description: 'The file id',
                required: true
              },
              {
                name: ':name',
                type: 'String',
                description: 'The file name',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: '<Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00...>'
              }
            ]
          },
          {
            name: 'CREATE',
            url: '/files',
            method: 'POST',
            params: [
              {
                name: 'file',
                type: 'File',
                description: 'A file',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'files',
                    'id': '5b9b918bbbfd7c48a1cbdb3a',
                    'attributes': {
                      '_id': '5b9b918bbbfd7c48a1cbdb3a',
                      'name': 'picture.png',
                      'size': 7841,
                      'type': 'image/png',
                      'created_at': '2018-09-14T10:46:35.867Z',
                      'updated_at': '2018-09-14T10:46:35.867Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'DELETE',
            url: '/files/:id',
            method: 'DELETE',
            params: [
              {
                name: ':id',
                type: 'String',
                description: 'The file id',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'files',
                    'id': '5b9b918bbbfd7c48a1cbdb3a',
                    'attributes': {
                      '_id': '5b9b918bbbfd7c48a1cbdb3a',
                      'name': 'picture.png',
                      'size': 7841,
                      'type': 'image/png',
                      'created_at': '2018-09-14T10:46:35.867Z',
                      'updated_at': '2018-09-14T10:46:35.867Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        name: 'messages',
        endpoints: [
          {
            name: 'PAGINATE',
            url: '/messages',
            method: 'GET',
            headers: [
              {
                name: 'Authorization',
                type: 'String',
                description: 'The user token',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': [
                    {
                      'type': 'messages',
                      'id': '5b9a95582e2c39532c3c49f3',
                      'attributes': {
                        '_id': '5b9a95582e2c39532c3c49f3',
                        'sender': null,
                        'receiver': null,
                        'content': 'Odit quo iste inventore ab in.',
                        'created_at': '2018-09-13T16:50:32.400Z',
                        'updated_at': '2018-09-13T16:50:32.400Z',
                        '__v': 0
                      }
                    },
                    {
                      'type': 'messages',
                      'id': '5b9a9598b7b16a538f4f8761',
                      'attributes': {
                        '_id': '5b9a9598b7b16a538f4f8761',
                        'sender': null,
                        'receiver': null,
                        'content': 'Qui dolor iure corporis in autem laudantium officia voluptas.',
                        'created_at': '2018-09-13T16:51:36.350Z',
                        'updated_at': '2018-09-13T16:51:36.350Z',
                        '__v': 0
                      }
                    },
                    {
                      'type': 'messages',
                      'id': '5b9a962b62452d5459210bf6',
                      'attributes': {
                        '_id': '5b9a962b62452d5459210bf6',
                        'sender': null,
                        'receiver': null,
                        'content': 'Debitis animi deleniti atque voluptate velit voluptas.',
                        'created_at': '2018-09-13T16:54:03.489Z',
                        'updated_at': '2018-09-13T16:54:03.489Z',
                        '__v': 0
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            name: 'READ',
            url: '/messages/:id',
            method: 'GET',
            headers: [
              {
                name: 'Authorization',
                type: 'String',
                description: 'The user token',
                required: true
              }
            ],
            params: [
              {
                name: ':id',
                type: 'String',
                description: 'The file id',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'messages',
                    'id': '5b9a962b62452d5459210bf6',
                    'attributes': {
                      '_id': '5b9a962b62452d5459210bf6',
                      'sender': null,
                      'receiver': null,
                      'content': 'Debitis animi deleniti atque voluptate velit voluptas.',
                      'created_at': '2018-09-13T16:54:03.489Z',
                      'updated_at': '2018-09-13T16:54:03.489Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'CREATE',
            url: '/messages',
            method: 'POST',
            headers: [
              {
                name: 'Authorization',
                type: 'String',
                description: 'The user token',
                required: true
              }
            ],
            params: [
              {
                name: 'sender',
                type: 'String',
                description: 'The sender id',
                required: true
              },
              {
                name: 'receiver',
                type: 'String',
                description: 'The receiver id',
                required: true
              },
              {
                name: 'content',
                type: 'String',
                description: 'The message content',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'messages',
                    'id': '5b9b99aba4962c57c8d75fd3',
                    'attributes': {
                      '_id': '5b9b99aba4962c57c8d75fd3',
                      'sender': '5b9b8f2cc3ac3343e4f1db33',
                      'receiver': '5b9b816056027225afbdd746',
                      'content': 'TEST MESSAGE',
                      'created_at': '2018-09-14T11:21:15.409Z',
                      'updated_at': '2018-09-14T11:21:15.409Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'DELETE',
            url: '/messages/:id',
            method: 'DELETE',
            headers: [
              {
                name: 'Authorization',
                type: 'String',
                description: 'The user token',
                required: true
              }
            ],
            params: [
              {
                name: ':id',
                type: 'String',
                description: 'The message id',
                required: true
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'messages',
                    'id': '5b9b99aba4962c57c8d75fd3',
                    'attributes': {
                      '_id': '5b9b99aba4962c57c8d75fd3',
                      'sender': '5b9b8f2cc3ac3343e4f1db33',
                      'receiver': '5b9b816056027225afbdd746',
                      'content': 'TEST MESSAGE',
                      'created_at': '2018-09-14T11:21:15.409Z',
                      'updated_at': '2018-09-14T11:21:15.409Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
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
            url: '/users/:id',
            method: 'DELETE'
          }
        ]
      }
    ]
  }

  res.render('docs', docs)
})

module.exports = router
