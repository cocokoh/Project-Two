var express =require('express')
var router = express.Router()
var Protwo = require('../models/schematwo')



router.get('/', function (req, res){
  res.render('homepage')
})

router.get('/about', function (req, res){
  res.render('about')
})

router.get('/faq', function (req, res){
  res.render('faq')
})

module.exports = router
