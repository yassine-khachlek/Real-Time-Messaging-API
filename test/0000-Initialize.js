const faker = require('faker')

process.env.NODE_ENV = 'test'

global.users = []

for (var i = 0; i < 3; i++) {
  global.users.push({
    _id: null,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: null
  })
}

describe('Initialize', function () {
  it('Start', done => {
    global.server = require('../bin/www')
    done()
  })
})
