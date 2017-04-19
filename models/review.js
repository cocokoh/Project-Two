var mongoose = require('mongoose')
// var bcrypt = require('bcrypt')
// var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var User = require('../models/user')
var Biz = require('../models/business')

var reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  restaurantId:
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Biz'
  },
  comment: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 to 99 characters'],
    maxlength: [1000, 'Name must be between 3 to 99 characters']
  }
})

var Review = mongoose.model('Review', reviewSchema)

module.exports = Review
