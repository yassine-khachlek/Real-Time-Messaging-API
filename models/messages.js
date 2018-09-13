const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  content: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

messageSchema.index({ sender: 1, receiver: 1 }, { unique: false })

const messageModel = mongoose.model('Message', messageSchema)

module.exports = messageModel
