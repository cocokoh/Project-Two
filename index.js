var express = require('express')
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 4000
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/mymdb'
mongoose.connect(dbURI)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected!')
})
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
//+++++++++++++STANDARD STUFF+++++++++++++++++++++++++++++++++++++++++

// TRYING TO LINK CSS
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// CONNECTING AND USING THE CONTROLLERS FILES
var protwoController = require('./controller/protwo_controller')
var signUp = require('./controller/signup')
var blog = require('./controller/blog')
app.use(protwoController)
app.use(signUp)
app.use(blog)

app.listen(port, function(){
  console.log('listening to ' + port)
})
