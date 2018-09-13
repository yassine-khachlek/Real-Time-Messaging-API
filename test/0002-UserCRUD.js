const assert = require('assert')
const request = require('superagent')

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
        .delete(process.env.APP_URL + '/users/' + users[2]._id)
        .set('Authorization', 'bearer ' + users[2].token)
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
        .get(process.env.APP_URL + '/users')
        .set('Authorization', 'bearer ' + users[2].token)
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
