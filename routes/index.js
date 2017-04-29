var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var User = require('../models/user')
var biz = require('../models/business')
var passport = require('passport')
var config = require('../config/ppConfig')
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
})

router.post('/', function (req, res){
  var username = req.body.username
  var email = req.body.email
  var password = req.body.password
  var business = true
  var newUser = new User({
    email: email,
    username: username,
    password: password,
    business: business
  })

  if (newUser.username === '' || newUser.email === '' || newUser.password === '') {
    res.send('error')
  } else {
    newUser.save(function(err, data) {
      if (err) return res.redirect('/register')
      res.redirect('/login')
    })
  }
})
//--------------------------USER CREATE--------------------------------------
router.route('/register')
  .get(function(req, res) {
    res.render('auth/signup')
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

    if (newUser.username === '' || newUser.email === '' || newUser.password === '') {
      res.send('error')
    } else {
      newUser.save(function(err, data) {
        if (err) return res.redirect('/register')
        res.redirect('/login')
      })
    }
  })

router.get('/login', function(req, res) {
  res.render('auth/login')
})

//--------------------------BIZ READ PROFILE--------------------------------------

router.get('/profile', isLoggedIn, function(req, res) {
  // console.log(req.user)
  if (req.user.business === true) {
    biz.find({
      ownedby: req.user.id
    }, function(err, data) {
      if (err) next()
      res.render('bizprofile', {
        restaurants: data
      })
    })
  } else {
    User.findById(req.user.id, function(err, data) {
      res.render('userprofile', {
        users: data
      })
    })
  }
})
//--------------------------------------------------------------------
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
      User.find({
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



router.get('/faq', function(req, res) {
  res.render('faq')
})

//--------------------------USER LOGIN & LOGOUT--------------------------------------

// FLASH
router.post('/login', passport.authenticate('local', {
  failureFlash: 'Unsuccessful',
  failureRedirect: '/login'
}), (req, res) => {
  biz.findOne({
    ownedby: req.user.id
  }, function(err, data) {
    var datas = data
    // console.log(datas.ownedby)
    // console.log(req.user.id)
    if (datas) {
      if (datas.ownedby.equals(req.user.id) && req.user.business === true) {
        req.flash("success", "successfully logged in")
        res.redirect('/profile')
      }
    } else if (req.user.business === true) {
      res.redirect('/business/register')
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

router.get('/logout', isLoggedIn, function(req, res) {
  req.logout()
  // FLASH
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
