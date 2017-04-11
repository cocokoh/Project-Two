var mongoose = require('mongoose')

var protwoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

var Protwo = mongoose.model('Protwo', protwoSchema)

module.exports = Protwo
