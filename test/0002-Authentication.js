const assert = require('assert')
const request = require('superagent')

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
            assert.ok(res.body._id)
            users[userIndex]._id = res.body._id
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
            assert.ok(res.body.token)
            users[userIndex].token = res.body.token
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
            assert.ok(res.body._id)
            done()
          })
      } catch (e) {
        done(e)
      }
    })
  })
})
