const assert = require('assert')
const request = require('superagent')
const faker = require('faker')
const io = require('socket.io-client')
const ObjectId = require('mongodb').ObjectID

var users = global.users
var messages = global.messages

describe('MessageCRUD', function () {
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
        ioClient.on('*', function (eventData) {
          if (eventData.name === 'auth.login') {
            assert.strictEqual(eventData.status, 200)
            assert.strictEqual(eventData.data.id, users[1]._id)
          }
          if (eventData.name === 'messages.create') {
            assert.strictEqual(eventData.status, 200)
            assert.ok(eventData.data instanceof Object)
            assert.ok(!Array.isArray(eventData.data))
            assert.strictEqual(eventData.data.type, 'messages')
            assert.ok(eventData.data.id)
            assert.ok(ObjectId.isValid(eventData.data.id))
            assert.ok(eventData.data.attributes)
            assert.ok(eventData.data.attributes._id)
            assert.ok(ObjectId.isValid(eventData.data.attributes._id))
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
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.strictEqual(res.body.data.type, 'messages')
          assert.ok(res.body.data.id)
          assert.ok(ObjectId.isValid(res.body.data.id))
          assert.ok(res.body.data.attributes)
          assert.ok(res.body.data.attributes._id)
          assert.ok(ObjectId.isValid(res.body.data.attributes._id))
          messages.push(res.body.data.attributes)
        })
    } catch (e) {
      done(e)
    }
  })

  it('Read', done => {
    try {
      request
        .get(process.env.APP_URL + '/messages/' + messages[messages.length - 1]._id)
        .set('Authorization', 'bearer ' + users[0].token)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.strictEqual(res.body.data.type, 'messages')
          assert.ok(res.body.data.id)
          assert.ok(ObjectId.isValid(res.body.data.id))
          assert.ok(res.body.data.attributes)
          assert.ok(res.body.data.attributes._id)
          assert.ok(ObjectId.isValid(res.body.data.attributes._id))
          done()
        })
    } catch (e) {
      done(e)
    }
  })

  it('Delete', done => {
    try {
      request
        .delete(process.env.APP_URL + '/messages/' + messages[messages.length - 1]._id)
        .set('Authorization', 'bearer ' + users[0].token)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.strictEqual(res.body.data.type, 'messages')
          assert.ok(res.body.data.id)
          assert.ok(ObjectId.isValid(res.body.data.id))
          assert.ok(res.body.data.attributes)
          assert.ok(res.body.data.attributes._id)
          assert.ok(ObjectId.isValid(res.body.data.attributes._id))
          messages.pop()
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
          assert.ok(res.body.data instanceof Object)
          assert.ok(Array.isArray(res.body.data))
          done()
        })
    } catch (e) {
      done(e)
    }
  })
})
