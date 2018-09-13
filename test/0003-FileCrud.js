const assert = require('assert')
const request = require('superagent')

var users = global.users

describe('FileCRUD', function () {
  it('Create', done => {
    request
      .post(process.env.APP_URL + '/files')
      .attach('file', './public/nodejs-new-pantone-black.png')
      .end(function (err, res) {
        if (err) done(err)
        assert.strictEqual(res.status, 200)
        done()
      })
  })

  it('List', done => {
    try {
      request
        .get(process.env.APP_URL + '/files')
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
