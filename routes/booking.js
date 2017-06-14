var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var User = require('../models/user')
var biz = require('../models/business')
var Review = require('../models/review')
var isLoggedIn = require('../middleware/isLoggedIn')
var Booking = require('../models/booking')
var userBooking = require('../middleware/userBooking')

router.get('/:id', isLoggedIn, userBooking, function(req, res) {
  biz.findOne({
    _id: req.params.id
  }, function(err, data) {
    res.render('userbook', {restaurant: data})
  })
})

router.post('/:id', isLoggedIn, userBooking, function(req, res) {
  var date = req.body.date
  var name = req.body.name
  var restaurantId = req.params.id
  var userId = req.user
  var contact = req.body.contact
  var pax = req.body.pax
  var time = req.body.time
  var booked = true
  var newBooking = new Booking({
    date: date,
    time: time,
    restaurantId: restaurantId,
    name: name,
    contact: contact,
    pax: pax,
    userId: userId,
    booked: booked
  })
  if (newBooking.email === "" || newBooking.contact === "" || newBooking.name === "" || newBooking.pax === "") {
    req.flash('Please fill in all fields')
  } else {
    newBooking.save(function(err, data) {
      if (err)
        throw err
      req.flash('You are all booked!')
      res.redirect('/restaurant/profile/' + restaurantId)
    })
  }
})

router.get('/cancel/:id', isLoggedIn, function(req,res){
    Booking.findOne({
      _id: req.params.id
    }, function(err,data){
      res.render('deletebook', {
      restaurant: data
      })
    })
})

router.put('/cancel/:id', function(req, res) {
  // console.log(req.user.id)
  Booking.findOne({_id: req.params.id}, function(err, reservation) {
    console.log(req.params.id)
    if (err) {
      return console.error(err);
    } else {
      reservation.update({
        booked: false
      }, function(err, data){
        if (err) throw err
        else{
          res.redirect('/profile')
        console.log('success!')
      }})
    }
  });
});
module.exports = router
