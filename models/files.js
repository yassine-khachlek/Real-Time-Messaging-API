const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
  name: String,
  type: String,
  size: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const fileModel = mongoose.model('File', fileSchema)

module.exports = fileModel
