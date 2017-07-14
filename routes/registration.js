const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/register', function(req, res){
  res.render('registration/new')
})

router.post('/register', function(req, res){
  const user = new User()
  user.username = req.body.username
  user.password = req.body.password
  user.save()
  .then(function(user){
    req.session.userId = user._id
    res.redirect('/')
  })
  .catch(function(err){
    console.log(err)
    res.render('/registration/new', {
      user: user,
      err: err
    })
  })
})

module.exports = router
