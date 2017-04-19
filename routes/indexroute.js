var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var users = require('../models/user')
// var authe = require('./auth')
var biz = require('../models/business')

router.get('/', function(req, res) {
  biz.find({}).distinct('cuisine').exec(function(err, data) {
    if (err) res.send('err')
    biz.find({}).distinct('location').exec(function(err, data1) {
      res.render('homepage', {
        cuisine: data,
        location: data1
      })


    })
  })
  // biz.find({}, function(err, data){
  //   res.render('homepage', {data: data})
  // })
})
router.post('/results', function(req, res) {
  biz.find({
    cuisine: req.body.cuisine,
    location: req.body.location
  }, function(err, data) {
    if (err) throw err;


    res.render('restaurant', {
      restaurant: data
    })
    // })
  })
})

router.get('/restaurant/profile/:restaurant_name', function(req, res) {
  biz.findOne({
      restaurant_name: req.params.restaurant_name
    }, function(err, data) {
      if (err) next()
      console.log(data)
res.render('restaurantprofile', {restaurant: data}) })
    // console.log(req.params.restaurant_name)})
})



router.get('/about', function(req, res) {
  res.render('about')
})

router.get('/faq', function(req, res) {
  res.render('faq')
})

module.exports = router
