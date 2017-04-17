var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
// var authe = require('./auth')
var config = require('../config/ppConfig')
var bizreg = require('./bizreg')
var isLoggedIn = require('../middleware/isLoggedIn')
var Biz = require('../models/business')

router.route('/register')
  .get(function(req, res) {
    res.render('auth/signup');
  })
  .post(function(req, res) {
    var username = req.body.username
    var email = req.body.email
    var password = req.body.password
    var business = req.body.business
    var birthday = req.body.birthday

    var newUser = new User({
      email: email,
      username: username,
      password: password,
      business: business,
      birthday: birthday
    })
    // for (var i = 0; i < 7; i++) {
    //   if ((Object.values(req.body))[i] === "") {

    if (newUser.username === "" || newUser.email === "" || newUser.password === "" ) {
      res.send('error')
      // res.redirect('/register')
    }
    // else if (newUser.business === true) {
    //   newUser.save()
    //   res.redirect('/bizreg')
    // }
     else {
      newUser.save(function(err, data) {
        if (err) return res.redirect('/register')
        res.redirect('/login')
      })
    }

  });



router.get('/login', function(req, res) {
  res.render('auth/login')
});

// FLASH
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
  }), (req, res) => {
   Biz.findOne({ownedby : req.user.id}, function (err,data){
    var datas= data
// console.log(datas.ownedby)
// console.log(req.user.id)
    if(datas){
      if (datas.ownedby.equals(req.user.id) && req.user.business === true) {
      res.redirect('/profile')
    }}

    else if  (req.user.business === true) {
      res.redirect('/bizreg');
    }
    else {
      res.redirect('/profile');
    }
})
  });
// {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: 'Invalid username and/or password',
//   successFlash: 'You have logged in'
// }))



router.get('/logout', isLoggedIn, function(req, res) {
  req.logout();
  // FLASH
  req.flash('success', 'You have logged out');
  res.redirect('/');
});













module.exports = router
