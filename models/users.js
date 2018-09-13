const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  picture: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    default: null
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
