const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: Array
  },
  snippet: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Book', bookSchema)