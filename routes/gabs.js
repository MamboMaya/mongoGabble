const express = require('express')
const router = express.Router()
const Gab = require('../models/Gab')

router.get('/gabs/new', function(req, res){
  res.render('gabs/new')
})

router.post('/gabs', function(req, res){
  const gab = new Gab()
  gab.message = req.body.message
  gab.username = req.user.username
  gab.save()
  .then(function(gab){
    res.redirect('/')
  })
  .catch(function(err){
    res.redirect('/gabs/new', {
      err: err,
      gab: gab
    })
  })
})

module.exports = router
