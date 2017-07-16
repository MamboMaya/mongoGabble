const express = require('express')
const app = express()
const mustache = require('mustache-express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan')
const authentication = require('./middleware/authentication')

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
const gabsRoutes = require('./routes/gabs')
const likesRoutes = require('./routes/likes')
const User = require('./models/User')
const Gab = require('./models/Gab')


app.use(sessionRoutes)
app.use(registrationRoutes)
app.use(authentication)
app.use(homepageRoute)
app.use(gabsRoutes)
app.use(likesRoutes)




app.listen(3000, function(){
  console.log('GOOD TO GO!!!!')
})
