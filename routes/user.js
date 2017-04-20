var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var config = require('../config/ppConfig')
var bizreg = require('./biz')
var isLoggedIn = require('../middleware/isLoggedIn')
var Biz = require('../models/business')

//--------------------------USER CREATE--------------------------------------
router.route('/register')
  .get(function (req, res) {
    res.render('auth/signup')
  })
  .post(function (req, res) {
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

    if (newUser.username === '' || newUser.email === '' || newUser.password === '') {
      res.send('error')
    }
    else {
      newUser.save(function (err, data) {
        if (err) return res.redirect('/register')
        res.redirect('/login')
      })
    }
  })

router.get('/login', function (req, res) {
  res.render('auth/login')
})

//--------------------------USER UPDATE & DELETE--------------------------------------

router.get('/user/edit', isLoggedIn, function(req, res) {
  // console.log(req.user)
  res.render('useredit')
})
router.put('/user/edit', isLoggedIn, function(req, res) {
  var username = req.body.username
  //find the document by ID
  User.findById(req.user.id, function(err, user) {
    if (err) {
      return console.error(err);
    } else {
    //update it
    user.update({
      username: username
    }, function(err, dataID) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      } else {

        res.redirect("/profile");

      }
    })
  }});
});
router.get('/user/delete', isLoggedIn, function(req, res) {
  // console.log(req.user.id)
  Biz.findOne({email: req.user.email}, function (err,data){
    if (err) next()
  res.render('userdelete', { restaurants : data })
})
})

router.delete('/user/delete', function(req, res) {
  // console.log(req.user.id)
  User.findById(req.user.id, function(err, user) {
    if (err) {
      return console.error(err);
    } else {
      //remove it from Mongo
      user.remove(function(err, biz) {
        if (err) {
          return console.error(err);
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + user._id);
          res.redirect("/profile");
        }
      });
    }
  });
});

//--------------------------USER LOGIN & LOGOUT--------------------------------------

// FLASH
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), (req, res) => {
  Biz.findOne({ownedby: req.user.id}, function (err, data) {
    var datas = data
// console.log(datas.ownedby)
// console.log(req.user.id)
    if (datas) {
      if (datas.ownedby.equals(req.user.id) && req.user.business === true) {
        res.redirect('/profile')
      }
    } else if (req.user.business === true) {
      res.redirect('/bizreg')
    } else {
      res.redirect('/profile')
    }
  })
})
// {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: 'Invalid username and/or password',
//   successFlash: 'You have logged in'
// }))

router.get('/logout', isLoggedIn, function (req, res) {
  req.logout()
  // FLASH
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
