var express =require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var users = require('../models/user')
// var authe = require('./auth')
var biz = require('../models/business')

router.get('/', function (req, res){
    res.render('homepage')
})

router.post('/', function (req,res){
  biz.find({cuisine: req.body.cuisine}, function(err,data){
    res.render('restaurant', {restaurant: data})
  })
})

router.get('/about', function (req, res){
  res.render('about')
})

router.get('/faq', function (req, res){
  res.render('faq')
})

module.exports = router
