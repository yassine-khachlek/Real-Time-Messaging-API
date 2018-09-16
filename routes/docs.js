var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var docs = {
    title: 'Real Time Messaging Api',
    app_url: process.env.APP_URL,
    repository: 'https://github.com/yassine-khachlek/real-time-messaging-api',
    groups: [
      {
        name: 'AUTHENTICATION',
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
              },
              {
                name: 'picture',
                type: 'String',
                description: 'The picture file id',
                required: false
              }
            ],
            responses: [
              {
                name: 'Response example',
                value: {
                  'data': {
                    'type': 'users',
                    'id': '5b9d23422be61559c6486ee1',
                    'attributes': {
                      'picture': null,
                      '_id': '5b9d23422be61559c6486ee1',
                      'name': 'User 1',
                      'email': 'user1@gmail.com',
                      'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                      'created_at': '2018-09-15T15:20:34.301Z',
                      'updated_at': '2018-09-15T15:20:34.301Z',
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
                    'id': '5b9d23422be61559c6486ee1',
                    'attributes': {
                      'picture': null,
                      '_id': '5b9d23422be61559c6486ee1',
                      'name': 'User 1',
                      'email': 'user1@gmail.com',
                      'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                      'created_at': '2018-09-15T15:20:34.301Z',
                      'updated_at': '2018-09-15T15:20:34.301Z',
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
        name: 'FILES',
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
            url: '/files/id',
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
            url: '/files/id/:name',
            method: 'GET',
            params: [
              {
                name: 'id',
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
            url: '/files/id',
            method: 'DELETE',
            params: [
              {
                name: 'id',
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
        name: 'MESSAGES',
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
                      'id': '5b9d25dd2be61559c6486ee3',
                      'attributes': {
                        '_id': '5b9d25dd2be61559c6486ee3',
                        'sender': {
                          'picture': null,
                          '_id': '5b9d23422be61559c6486ee1',
                          'name': 'User 1',
                          'email': 'user1@gmail.com',
                          'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                          'created_at': '2018-09-15T15:20:34.301Z',
                          'updated_at': '2018-09-15T15:20:34.301Z',
                          '__v': 0
                        },
                        'receiver': {
                          'picture': null,
                          '_id': '5b9d234d2be61559c6486ee2',
                          'name': 'User 2',
                          'email': 'user2@gmail.com',
                          'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                          'created_at': '2018-09-15T15:20:45.484Z',
                          'updated_at': '2018-09-15T15:20:45.484Z',
                          '__v': 0
                        },
                        'content': 'TEST MESSAGE 1',
                        'created_at': '2018-09-15T15:31:41.313Z',
                        'updated_at': '2018-09-15T15:31:41.313Z',
                        '__v': 0
                      }
                    },
                    {
                      'type': 'messages',
                      'id': '5b9d25e22be61559c6486ee4',
                      'attributes': {
                        '_id': '5b9d25e22be61559c6486ee4',
                        'sender': {
                          'picture': null,
                          '_id': '5b9d23422be61559c6486ee1',
                          'name': 'User 1',
                          'email': 'user1@gmail.com',
                          'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                          'created_at': '2018-09-15T15:20:34.301Z',
                          'updated_at': '2018-09-15T15:20:34.301Z',
                          '__v': 0
                        },
                        'receiver': {
                          'picture': null,
                          '_id': '5b9d234d2be61559c6486ee2',
                          'name': 'User 2',
                          'email': 'user2@gmail.com',
                          'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                          'created_at': '2018-09-15T15:20:45.484Z',
                          'updated_at': '2018-09-15T15:20:45.484Z',
                          '__v': 0
                        },
                        'content': 'TEST MESSAGE2',
                        'created_at': '2018-09-15T15:31:46.780Z',
                        'updated_at': '2018-09-15T15:31:46.780Z',
                        '__v': 0
                      }
                    },
                    {
                      'type': 'messages',
                      'id': '5b9d25e82be61559c6486ee5',
                      'attributes': {
                        '_id': '5b9d25e82be61559c6486ee5',
                        'sender': {
                          'picture': null,
                          '_id': '5b9d23422be61559c6486ee1',
                          'name': 'User 1',
                          'email': 'user1@gmail.com',
                          'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                          'created_at': '2018-09-15T15:20:34.301Z',
                          'updated_at': '2018-09-15T15:20:34.301Z',
                          '__v': 0
                        },
                        'receiver': {
                          'picture': null,
                          '_id': '5b9d234d2be61559c6486ee2',
                          'name': 'User 2',
                          'email': 'user2@gmail.com',
                          'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                          'created_at': '2018-09-15T15:20:45.484Z',
                          'updated_at': '2018-09-15T15:20:45.484Z',
                          '__v': 0
                        },
                        'content': 'TEST MESSAGE2',
                        'created_at': '2018-09-15T15:31:52.919Z',
                        'updated_at': '2018-09-15T15:31:52.919Z',
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
            url: '/messages/id',
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
                name: 'id',
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
                    'id': '5b9d25dd2be61559c6486ee3',
                    'attributes': {
                      '_id': '5b9d25dd2be61559c6486ee3',
                      'sender': {
                        'picture': null,
                        '_id': '5b9d23422be61559c6486ee1',
                        'name': 'User 1',
                        'email': 'user1@gmail.com',
                        'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                        'created_at': '2018-09-15T15:20:34.301Z',
                        'updated_at': '2018-09-15T15:20:34.301Z',
                        '__v': 0
                      },
                      'receiver': {
                        'picture': null,
                        '_id': '5b9d234d2be61559c6486ee2',
                        'name': 'User 2',
                        'email': 'user2@gmail.com',
                        'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                        'created_at': '2018-09-15T15:20:45.484Z',
                        'updated_at': '2018-09-15T15:20:45.484Z',
                        '__v': 0
                      },
                      'content': 'TEST MESSAGE 1',
                      'created_at': '2018-09-15T15:31:41.313Z',
                      'updated_at': '2018-09-15T15:31:41.313Z',
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
                    'id': '5b9d25dd2be61559c6486ee3',
                    'attributes': {
                      '_id': '5b9d25dd2be61559c6486ee3',
                      'sender': {
                        'picture': null,
                        '_id': '5b9d23422be61559c6486ee1',
                        'name': 'User 1',
                        'email': 'user1@gmail.com',
                        'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                        'created_at': '2018-09-15T15:20:34.301Z',
                        'updated_at': '2018-09-15T15:20:34.301Z',
                        '__v': 0
                      },
                      'receiver': {
                        'picture': null,
                        '_id': '5b9d234d2be61559c6486ee2',
                        'name': 'User 2',
                        'email': 'user2@gmail.com',
                        'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                        'created_at': '2018-09-15T15:20:45.484Z',
                        'updated_at': '2018-09-15T15:20:45.484Z',
                        '__v': 0
                      },
                      'content': 'TEST MESSAGE 1',
                      'created_at': '2018-09-15T15:31:41.313Z',
                      'updated_at': '2018-09-15T15:31:41.313Z',
                      '__v': 0
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'DELETE',
            url: '/messages/id',
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
                name: 'id',
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
                    'id': '5b9d25dd2be61559c6486ee3',
                    'attributes': {
                      '_id': '5b9d25dd2be61559c6486ee3',
                      'sender': {
                        'picture': null,
                        '_id': '5b9d23422be61559c6486ee1',
                        'name': 'User 1',
                        'email': 'user1@gmail.com',
                        'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                        'created_at': '2018-09-15T15:20:34.301Z',
                        'updated_at': '2018-09-15T15:20:34.301Z',
                        '__v': 0
                      },
                      'receiver': {
                        'picture': null,
                        '_id': '5b9d234d2be61559c6486ee2',
                        'name': 'User 2',
                        'email': 'user2@gmail.com',
                        'password': '5ebe2294ecd0e0f08eab7690d2a6ee69',
                        'created_at': '2018-09-15T15:20:45.484Z',
                        'updated_at': '2018-09-15T15:20:45.484Z',
                        '__v': 0
                      },
                      'content': 'TEST MESSAGE 1',
                      'created_at': '2018-09-15T15:31:41.313Z',
                      'updated_at': '2018-09-15T15:31:41.313Z',
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
        name: 'SOCKET.IO',
        endpoints: [
          {
            name: '',
            url: '/',
            description: 'Connection without a valid user token is dropped by immediatly disconnect.',
            method: 'CONNECT',
            queries: [
              {
                name: 'token',
                type: 'String',
                description: 'The user token',
                required: true
              }
            ],
            responses: [

            ]
          },
          {
            name: '*',
            description: 'Received events with name auth.login mean that connection is successful.',
            method: 'LISTEN',
            responses: [
              {
                name: 'Payload',
                value: {
                  name: 'auth.login',
                  status: 200,
                  data: {
                    'type': 'users',
                    'id': '5b9d3beb2211027f50eeb64b',
                    'attributes': {
                      'picture': null,
                      '_id': '5b9d3beb2211027f50eeb64b',
                      'name': 'Chet McLaughlin V',
                      'email': 'Johann.Gutkowski54@gmail.com',
                      'created_at': '2018-09-15T17:05:47.440Z',
                      'updated_at': '2018-09-15T17:05:47.440Z',
                      'iat': 1537031147,
                      'exp': 1568567147
                    }
                  }
                }
              }
            ]
          },
          {
            name: '*',
            description: 'Received events with name messages.create mean that the connected user has received a new message.',
            method: 'LISTEN',
            responses: [
              {
                name: 'Payload',
                value: {
                  name: 'messages.create',
                  status: 200,
                  data: {
                    type: 'messages',
                    id: '5b9d3dd1c9c37305dacac0de',
                    attributes: {
                      _id: '5b9d3dd1c9c37305dacac0de',
                      sender: '5b9d3dd1c9c37305dacac0db',
                      receiver: '5b9d3dd1c9c37305dacac0dc',
                      content: 'Aliquid debitis deserunt sit.',
                      created_at: '2018-09-15T17:13:53.449Z',
                      updated_at: '2018-09-15T17:13:53.449Z',
                      __v: 0
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }

  res.render('docs', docs)
})

module.exports = router
