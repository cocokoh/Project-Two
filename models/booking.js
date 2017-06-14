var mongoose = require('mongoose')
// var bcrypt = require('bcrypt')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var User = require('../models/user')
var Biz = require('../models/business')

var bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [1, 'Name must be between 1 to 40 characters'],
    maxlength: [40, 'Name must be between 1 to 40 characters']
  },
  contact: {
    type: Number,
    required: true,
    minlength: [8, 'Name must be between 8 to 99 characters'],
    maxlength: [17, 'Name must be between 8 to 99 characters']
  },
  pax: {
    type: Number,
    required: true,
    min: [1],
    max: [8]
  },
  restaurantId:
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Biz'
  },
  userId:
  {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  booked:
  {
    type: Boolean
  }
})
var Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
