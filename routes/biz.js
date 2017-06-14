var express = require('express');
var router = express.Router();
var Biz = require('../models/business')
var signup = require('./user')
var User = require('../models/user')
var isLoggedIn = require('../middleware/isLoggedIn')
var Review = require('../models/review')
var isBusiness = require('../middleware/isBusiness')
var cloudinary = require('cloudinary')
var multer = require('multer')
var upload = multer({dest: '../uploads/'})
var fs = require('fs');
//--------------------------BIZ CREATE--------------------------------------

router.get('/register', isLoggedIn, (function(req, res) {
  res.render('auth/bizreg');
}))

router.post('/register', upload.single('profilePicture'), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function (result) {
      if (result)
      console.log('uploaded!')


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
  var picture = result.secure_url

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
    location: location,
    picture: picture
  })

  if (newBiz.restaurant_name === "" || newBiz.nealicense === "" || newBiz.address === "" || newBiz.cuisine === "" || newBiz.email === "" || newBiz.description === "" || newBiz.contact === "" || newBiz.location === "") {
    req.flash('error')
    // res.redirect('/register')
  } else {
    newBiz.save(function(err, data) {
      if (err) throw err
      res.redirect('/profile')
    })
  }
})
}
)
//--------------------------BIZ READ PROFILE--------------------------------------

// router.get('/profile', isLoggedIn, function(req, res) {
//   // console.log(req.user)
//   if (req.user.business === true) {
//     Biz.find({
//       ownedby: req.user.id
//     }, function(err, data) {
//       if (err) next()
//       res.render('bizprofile', {
//         restaurants: data
//       })
//     })
//   } else {
//     User.findById(req.user.id, function(err, data) {
//       res.render('userprofile', {
//         users: data
//       })
//     })
//   }
// })
//--------------------------BIZ UPDATE & DELETE--------------------------------------
router.get('/:id/edit', isLoggedIn, isBusiness, function(req, res) {
  Biz.findOne({
    _id: req.params.id
  }, function(err, biz) {
    // console.log(req.user)
    res.render('bizedit', {
      business: biz
    })
  })
})
router.put('/:id/edit', isLoggedIn, isBusiness, function(req, res) {
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
router.get('/:id/delete', isLoggedIn, isBusiness, function(req, res) {
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

router.delete('/:id/delete', function(req, res) {

  Review.remove({restaurantId: req.params.id}, function(err,data){
    if (err) throw err
})
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
            if (bizFound.length === 0) {
              User.findOneAndUpdate({
                email: req.user.email
              }, {
                $set: {
                  business: false
                }
              }, function(err, email) {
                if (err) throw err
              })
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
