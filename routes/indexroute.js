var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var users = require('../models/user')
var biz = require('../models/business')
var Review = require('../models/review')
var isLoggedIn = require('../middleware/isLoggedIn')

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

router.get('/restaurant/profile/:id', function(req, res) {
  biz.find({
    _id: req.params.id
  }, function(err, data) {
    if (err) next()
    Review.find({
      restaurantId: req.params.id
    }, function(err, data1) {
      users.find({
        }, function(err, data3) {

          res.render('restaurantprofile', {
            restaurant: data,
            review: data1,
            ux: data3
          })
        })
    })
  })
})


router.get('/reviews/:id', isLoggedIn, function(req, res) {
  biz.findOne({
    _id: req.params.id
  }, function(err, data) {
    res.render('review', {
      restaurant: data
    })
  })
})


router.post('/reviews/:id', isLoggedIn, function(req, res) {
  var title = req.body.title
  var comment = req.body.comment
  var restaurantId = req.params.id
  var userId = req.user
  var newReview = new Review({
    title: title,
    restaurantId: restaurantId,
    comment: comment,
    userId: userId
  })
  if (newReview.comment === "") {
    res.send('error')
  } else {
    newReview.save(function(err, data) {
      if (err) throw err
      res.redirect('/restaurant/profile/' + restaurantId)
    })
  }
})

router.get('/about', function(req, res) {
  res.render('about')
})

router.get('/faq', function(req, res) {
  res.render('faq')
})

module.exports = router
