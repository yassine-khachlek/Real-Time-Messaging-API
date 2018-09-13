const request = require('superagent')

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
            if (indexUser === users.length - 1) done()
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
