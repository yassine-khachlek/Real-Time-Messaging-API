const assert = require('assert')
const request = require('superagent')
const faker = require('faker')
const io = require('socket.io-client')

var users = global.users

describe('MessageCRUD', function () {
  var message

  var ioClientOptions

  before(function () {
    ioClientOptions = {
      transports: ['websocket'],
      'force new connection': true,
      query: {
        token: users[1].token
      }
    }
  })

  it('Create', done => {
    try {
      var ioClient = io.connect(process.env.APP_URL, ioClientOptions)

      ioClient.once('connect', function () {
        ioClient.on('event', function (eventData) {
          if (eventData.name === 'authenticate') {
            assert.strictEqual(eventData.status, 'authorized')
            assert.strictEqual(eventData.data.user._id, users[1]._id)
          }
          if (eventData.name === 'message.create') {
            assert.strictEqual(eventData.status, 'created')
            assert.ok(eventData.data.message._id)
            done()
          }
        })
      })

      request
        .post(process.env.APP_URL + '/messages')
        .set('Authorization', 'bearer ' + users[0].token)
        .send({
          sender: users[0]._id,
          receiver: users[1]._id,
          content: faker.lorem.sentence()
        })
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body._id)
          message = res.body
        })
    } catch (e) {
      done(e)
    }
  })

  it('Read', done => {
    try {
      request
        .get(process.env.APP_URL + '/messages/' + message._id)
        .set('Authorization', 'bearer ' + users[0].token)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body._id)
          done()
        })
    } catch (e) {
      done(e)
    }
  })

  it('Delete', done => {
    try {
      request
        .delete(process.env.APP_URL + '/messages/' + message._id)
        .set('Authorization', 'bearer ' + users[0].token)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body._id)
          done()
        })
    } catch (e) {
      done(e)
    }
  })

  it('List', done => {
    try {
      request
        .get(process.env.APP_URL + '/messages')
        .set('Authorization', 'bearer ' + users[0].token)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          done()
        })
    } catch (e) {
      done(e)
    }
  })
})
