var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
var config = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var Biz = require('../models/business')

router.get('/profile', isLoggedIn, function(req, res) {
  // console.log(req.user)
  if (req.user.business === true) {
  Biz.findOne({ownedby: req.user.id}, function (err,data){
    if (err) next()
  res.render('bizprofile', { restaurants : data })
})} else {
  User.findById(req.user.id, function(err,data){
  res.render('userprofile', {users : data})
})
}
})

router.get('/business/edit', isLoggedIn, function(req, res) {
  // console.log(req.user)
  res.render('bizedit')
})
router.put('/business/edit', isLoggedIn, function(req, res) {
  var address = req.body.address
  var location = req.body.location
  var promotion = req.body.promotion
  var description = req.body.description
  
  //find the document by ID
  Biz.findOne({ownedby: req.user.id}, function(err, biz) {
    if (err) {
      return console.error(err);
    } else {
    //update it
    biz.update({
      address: address,
      location: location,
      description: description,
      promotion: promotion
    }, function(err, dataID) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      } else {

        res.redirect("/profile");

      }
    })
  }});
});
router.get('/business/delete', isLoggedIn, function(req, res) {
  // console.log(req.user.id)
  Biz.findOne({ownedby: req.user.id}, function (err,data){
    if (err) next()
  res.render('bizdelete', { restaurants : data })
})
})

router.delete('/business/delete', function(req, res) {
  // console.log(req.user.id)

  Biz.findOne({ownedby:req.user.id}, function(err, biz) {
    if (err) {
      return console.error(err);
    } else {
      //remove it from Mongo
      biz.remove(function(err, biz) {
        if (err) {
          return console.error(err);
        } else {
          User.findOneAndUpdate({email:req.user.email}, {$set: {business:false}}, function (err, email){
            if (err) throw err
          })
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + biz._id)
          res.redirect("/");

        }
      });
    }
  });
});


module.exports = router
