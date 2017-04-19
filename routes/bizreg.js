var express = require('express');
var router = express.Router();
var Biz = require('../models/business')
// var passport = require('passport')
// var config = require('../config/ppConfig')
var signup=  require('./userreg')
var User = require('../models/user')
var isLoggedIn = require('../middleware/isLoggedIn')

router.get('/bizreg', isLoggedIn, (function(req, res) {
    res.render('auth/bizreg');
  }))

router.post('/bizreg', function(req, res) {
    var restaurant_name = req.body.restaurant_name
    var nealicense = req.body.nealicense
    var address = req.body.address
    var cuisine = req.body.cuisine
    var email = req.body.email
    var ownedby = req.user
    var promotion = req.body.promotion
    var contact = req.body.contact
    var description = req.body.description
    var location = req.body.location

    // console.log(req.user)
    // console.log(ownedby)

    var newBiz = new Biz({
      restaurant_name: restaurant_name,
      nealicense: nealicense,
      address: address,
      cuisine: cuisine,
      email: email,
      ownedby: ownedby,
      description: description,
      contact: contact,
      promotion: promotion,
      location: location
    })

    // for (var i = 0; i < 7; i++) {
    //   if ((Object.values(req.body))[i] === "") {
    if (newBiz.restaurant_name === "" || newBiz.nealicense === "" || newBiz.address === "" || newBiz.cuisine === "" || newBiz.email === "" || newBiz.description === "" || newBiz.contact === "" || newBiz.location === "") {
      res.send('error')
      // res.redirect('/register')
    } else {
      newBiz.save(function(err, data) {
        if (err) throw err
        res.redirect('/profile')
      })
    }
  })

  module.exports = router
