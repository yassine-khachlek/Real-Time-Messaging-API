var mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

var DB_USER_INFO = ''

if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
  DB_USER_INFO = process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
}

mongoose.connect('mongodb://' + DB_USER_INFO + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE + '?authSource=admin', {
  useNewUrlParser: true
})
  .then(() => console.log(''))
  .catch(err => console.log(err))

var database = mongoose.connection

database.on('error', console.error.bind(console, 'Connection error:'))

database.once('open', function () {
  // we're connected!
})

module.exports = database
