var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var User = require('../models/user')
var biz = require('../models/business')
var Review = require('../models/review')
var isLoggedIn = require('../middleware/isLoggedIn')

router.get('/:id', isLoggedIn, function(req, res) {
  biz.findOne({
    _id: req.params.id
  }, function(err, data) {
    res.render('review', {
      restaurant: data
    })
  })
})


router.post('/:id', isLoggedIn, function(req, res) {
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

module.exports = router
