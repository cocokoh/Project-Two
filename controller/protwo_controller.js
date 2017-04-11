var express =require('express')
var router = express.Router()
var Protwo = require('../models/schematwo')

router.get('/', function (req, res){
  res.render('homepage')
})

module.exports = router
