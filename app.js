const express = require('express')
const app = express()
const mustache = require('mustache-express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.set('layout', 'layout')
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/gabble')
var sess = {
  secret: 'boomshakalaka',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {},
  resave: true,
  saveUninitialized: true
}
app.use(session(sess))

const homepageRoute = require('./routes/homepage')
const sessionRoutes = require('./routes/session')
const registrationRoutes = require('./routes/registration')
const User = require('./models/User')

app.use(sessionRoutes)
app.use(registrationRoutes)
app.use(function(req, res, next){
  if (req.session.userId) {
    User.findOne({_id: req.session.userId})
    .then(function(user){
      req.user = user
      next()
    })
  } else {
    res.redirect('/login')
  }
})
app.use(homepageRoute)






app.listen(3000, function(){
  console.log('GOOD TO GO!!!!')
})
