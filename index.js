var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
var port = process.env.PORT || 3000
app.set('view engine', ejs)
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/mymdb'
mongoose.connect(dbURI)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected!')
})

app.use(express.static(path.join(__dirname, 'public')))

var protwoController = require('./controller/protwo_controller')
app.use(protwoController)

app.listen(port, function(){
  console.log('listening to ' + port)
})
