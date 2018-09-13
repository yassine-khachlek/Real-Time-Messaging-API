const assert = require('assert')
const request = require('superagent')
const ObjectId = require('mongodb').ObjectID

var users = global.users

describe('UserCRUD', function () {
  it('Read', done => {
    try {
      request
        .get(process.env.APP_URL + '/users/' + users[2]._id)
        .set('Authorization', 'bearer ' + users[2].token)
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
          done()
        })
    } catch (e) {
      done(e)
    }
  })

  it('List', done => {
    try {
      request
        .get(process.env.APP_URL + '/users')
        .set('Authorization', 'bearer ' + users[2].token)
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

  it('Delete', done => {
    try {
      request
        .delete(process.env.APP_URL + '/users/' + users[2]._id)
        .set('Authorization', 'bearer ' + users[2].token)
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
          users.pop()
          done()
        })
    } catch (e) {
      done(e)
    }
  })
})
