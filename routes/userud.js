var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
var config = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var Biz = require('../models/business')


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


module.exports = router
