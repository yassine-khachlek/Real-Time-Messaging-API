const assert = require('assert')
const request = require('superagent')
const ObjectId = require('mongodb').ObjectID

var files = global.files

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
        assert.strictEqual(res.body.data.type, 'files')
        assert.ok(res.body.data.id)
        assert.ok(ObjectId.isValid(res.body.data.id))
        assert.ok(res.body.data.attributes)
        assert.ok(res.body.data.attributes._id)
        assert.ok(ObjectId.isValid(res.body.data.attributes._id))
        files.push(res.body.data.attributes)
        done()
      })
  })

  it('Read', done => {
    try {
      request
        .get(process.env.APP_URL + '/files/' + files[files.length - 1]._id)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.strictEqual(res.body.data.type, 'files')
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

  it('Serve', done => {
    try {
      request
        .get(process.env.APP_URL + '/files/' + files[files.length - 1]._id + '/' + files[files.length - 1].name)
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
        .delete(process.env.APP_URL + '/files/' + files[files.length - 1]._id)
        .end((err, res) => {
          if (err) done(err)
          assert.strictEqual(res.status, 200)
          assert.ok(res.body.data instanceof Object)
          assert.ok(!Array.isArray(res.body.data))
          assert.strictEqual(res.body.data.type, 'files')
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
})
