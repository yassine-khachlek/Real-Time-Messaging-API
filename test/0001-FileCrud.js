const assert = require('assert')
const request = require('superagent')
const ObjectId = require('mongodb').ObjectID

var file = null

describe('File', function () {
  it('Create', done => {
    request
      .post(process.env.APP_URL + '/files')
      .attach('file', './resources/images/picture.png')
      .end(function (err, res) {
        if (err) done(err)
        assert.strictEqual(res.status, 200)
        assert.ok(res.body.data instanceof Object)
        assert.ok(!Array.isArray(res.body.data))
        assert.ok(res.body.data._id)
        assert.ok(ObjectId.isValid(res.body.data._id))
        file = res.body.data
        done()
      })
  })

  it('Read', done => {
    try {
      request
        .get(process.env.APP_URL + '/files/' + file._id)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.ok(res.body.data._id)
          assert.ok(ObjectId.isValid(res.body.data._id))
          done()
        })
    } catch (e) {
      done(e)
    }
  })

  it('Serve', done => {
    try {
      request
        .get(process.env.APP_URL + '/files/' + file._id + '/' + file.name)
        .end((err, res) => {
          if (err) done(err)
          assert.ok(res.body instanceof Buffer)
          done()
        })
    } catch (e) {
      done(e)
    }
  })

  it('List', done => {
    try {
      request
        .get(process.env.APP_URL + '/files')
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
        .delete(process.env.APP_URL + '/files/' + file._id)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.ok(res.body.data._id)
          assert.ok(ObjectId.isValid(res.body.data._id))
          done()
        })
    } catch (e) {
      done(e)
    }
  })
})
