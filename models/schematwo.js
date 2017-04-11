var mongoose = require('mongoose')

var protwoSchema = new mongoose.Schema({
  name: { type: String, required: true, min: [5, 'Too short'] },
  description: { type: String }
})

var Protwo = mongoose.model('Protwo', todoSchema)

module.exports = Protwo
