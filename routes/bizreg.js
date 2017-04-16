var express = require('express');
var router = express.Router();
var Biz = require('../models/business')
// var passport = require('passport')
// var config = require('../config/ppConfig')
var signup=  require('./userreg')

router.get('/bizreg', (function(req, res) {
    res.render('auth/bizreg');
  }))

router.post('/bizreg', function(req, res) {
    var restaurant_name = req.body.restaurant_name
    var nealicense = req.body.nealicense
    var address = req.body.address
    var cuisine = req.body.cuisine
    var email = req.body.email

    var newBiz = new Biz({
      restaurant_name: restaurant_name,
      nealicense: nealicense,
      address: address,
      cuisine: cuisine,
      email: email
    })
    // for (var i = 0; i < 7; i++) {
    //   if ((Object.values(req.body))[i] === "") {
    if (newBiz.restaurant_name === "" || newBiz.nealicense === "" || newBiz.address === "" || newBiz.cuisine === "" || newBiz.email === "") {
      res.send('error')
      // res.redirect('/register')
    } else {
      newBiz.save(function(err, data) {
        if (err) return res.redirect('/register')
        res.redirect('/login')
      })
    }
  })

  module.exports = router
