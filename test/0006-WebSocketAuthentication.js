const assert = require('assert')
const io = require('socket.io-client')

var users = global.users

describe('WebSocketAuthentication', function () {
  var ioClientOptions

  before(function () {
    ioClientOptions = {
      transports: ['websocket'],
      'force new connection': true,
      query: {
        token: users[0].token
      }
    }
  })

  it('Authenticate', function (done) {
    var ioClient = io.connect(process.env.APP_URL, ioClientOptions)

    ioClient.once('connect', function () {
      ioClient.once('event', function (eventData) {
        assert.strictEqual(eventData.name, 'authenticate')
        assert.strictEqual(eventData.status, 'authorized')
        assert.strictEqual(eventData.data.user._id, users[0]._id)

        ioClient.disconnect()
        done()
      })
    })
  })
})
