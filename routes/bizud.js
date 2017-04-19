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
    Biz.find({
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

router.get('/business/:id/edit', isLoggedIn, function(req, res) {
  Biz.findOne({
    _id: req.params.id
  }, function(err, biz) {
    // console.log(req.user)
    res.render('bizedit', {
      business: biz
    })
  })
})
router.put('/business/:id/edit', isLoggedIn, function(req, res) {
  var address = req.body.address
  var location = req.body.location
  var promotion = req.body.promotion
  var description = req.body.description

  //find the document by ID
  Biz.findOne({
    _id: req.params.id
  }, function(err, biz) {
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
    }
  });
});
router.get('/business/:id/delete', isLoggedIn, function(req, res) {
  // console.log(req.user.id)
  Biz.findOne({
    _id: req.params.id
  }, function(err, data) {
    if (err) next()
    res.render('bizdelete', {
      restaurants: data
    })
  })
})

router.delete('/business/:id/delete', function(req, res) {
      // console.log(req.user.id)

      Biz.findOne({
        _id: req.params.id
      }, function(err, biz) {
        if (err) {
          return console.error(err);
        } else {
          //remove it from Mongo
          biz.remove(function(err, bizs) {
            if (err) {
              return console.error(err);
            } else {
              Biz.find({
                ownedby: req.user.id
              }, function(err, bizFound) {
                  // console.log(bizFound)
                if (bizFound.length===0) {
                  // console.log('not found any business');
                  User.findOneAndUpdate({
                    email: req.user.email
                  }, {
                    $set: {
                      business: false
                    }
                  }, function(err, email) {
                    if (err) throw err
                    // res.redirect("/");
                  })
                  //     // res.render('bizprofile', {restaurants: biz})
                }
                //Returning success messages saying it was deleted
                console.log('DELETE removing ID: ' + biz._id)
                res.redirect("/");
              });
            }
          });
        }
      });
    })


      module.exports = router
