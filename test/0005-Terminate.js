const assert = require('assert')
const request = require('superagent')
const ObjectId = require('mongodb').ObjectID

var users = global.users

describe('Terminate', function () {
  var token

  before(function () {
    token = users[0].token
  })

  it('Clean', done => {
    users.forEach(function (user, indexUser) {
      try {
        request
          .delete(process.env.APP_URL + '/users/' + user._id)
          .set('Authorization', 'bearer ' + token)
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
            if (indexUser === users.length - 1) { done() }
          })
      } catch (e) {
        done(e)
      }
    })
  })

  it('Close', done => {
    setTimeout(function () {
      process.exit(0)
    }, 500)
    done()
  })
})
