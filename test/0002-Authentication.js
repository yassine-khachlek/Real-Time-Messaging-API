const assert = require('assert')
const request = require('superagent')
const ObjectId = require('mongodb').ObjectID

var users = global.users

describe('Authentication', function () {
  users.forEach(function (user, userIndex) {
    it('Register: User' + userIndex, done => {
      try {
        request
          .post(process.env.APP_URL + '/auth/register')
          .send(users[userIndex])
          .end((err, res) => {
            if (err) done(err)
            assert.strictEqual(res.status, 200)
            assert.ok(res.body.data instanceof Object)
            assert.ok(!Array.isArray(res.body.data))
            assert.strictEqual(res.body.data.type, 'users')
            assert.ok(res.body.data.id)
            assert.ok(ObjectId.isValid(res.body.data.id))
            assert.ok(res.body.data.attributes)
            assert.ok(res.body.data.attributes._id)
            assert.ok(ObjectId.isValid(res.body.data.attributes._id))
            users[userIndex]._id = res.body.data.id
            done()
          })
      } catch (e) {
        done(e)
      }
    })
  })
  users.forEach(function (user, userIndex) {
    it('Login: User' + userIndex, done => {
      try {
        request
          .post(process.env.APP_URL + '/auth/login')
          .send({
            username: users[userIndex].email,
            password: users[userIndex].password
          })
          .end((err, res) => {
            if (err) done(err)
            assert.strictEqual(res.status, 200)
            assert.ok(res.body.data instanceof Object)
            assert.ok(!Array.isArray(res.body.data))
            assert.strictEqual(res.body.data.type, 'tokens')
            assert.ok(res.body.data.attributes)
            assert.ok(res.body.data.attributes.value)
            users[userIndex].token = res.body.data.attributes.value
            done()
          })
      } catch (e) {
        done(e)
      }
    })
  })
  users.forEach(function (user, userIndex) {
    it('Token: User' + userIndex, done => {
      try {
        request
          .get(process.env.APP_URL + '/auth/token/verify')
          .set('Authorization', 'bearer ' + users[userIndex].token)
          .end((err, res) => {
            if (err) done(err)
            assert.strictEqual(res.status, 200)
            assert.ok(res.body.data instanceof Object)
            assert.ok(!Array.isArray(res.body.data))
            assert.strictEqual(res.body.data.type, 'users')
            assert.ok(res.body.data.id)
            assert.ok(ObjectId.isValid(res.body.data.id))
            assert.ok(res.body.data.attributes)
            assert.ok(res.body.data.attributes._id)
            assert.ok(ObjectId.isValid(res.body.data.attributes._id))
            users[userIndex]._id = res.body.data.id
            done()
          })
      } catch (e) {
        done(e)
      }
    })
  })
})
