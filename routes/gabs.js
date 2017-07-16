const express = require('express')
const router = express.Router()
const Gab = require('../models/Gab')

function fetchGab(req, res, next){
  Gab.findOne({_id: req.params.id, username: req.user.username})
  .then(function(gab){
    if (gab) {
      req.gab = gab
      next()
    } else {
      res.status(401).send('UNAUTHORIZED')
    }
  })
}

router.get('/gabs/new', function(req, res){
  res.render('gabs/new', {
    user: req.user
  })
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
    res.render('gabs/new', {
      err: err,
      gab: gab
    })
  })
})

router.get('/gabs/:id/edit', fetchGab, function(req, res){
  res.render('gabs/edit', {
    user: req.user,
    gab: req.gab
  })
})

router.get('/gabs/:id/likes', function(req, res){
  Gab.findOne({_id: req.params.id})
  .then(function(gab){
    console.log(gab)
    res.render('gabs/gabLikes', {
      user: req.user,
      gab: gab
    })
  })
})

router.post('/gabs/:id', fetchGab, function(req, res){
  const gab = req.gab
  gab.message = req.body.message
  gab.save()
  .then(function(gab){
    res.redirect('/')
  })
  .catch(function(err){
    res.render('gabs/edit',{
      user: req.user,
      gab: gab,
      err: err
    })
  })
})

router.post('/gabs/:id/delete', fetchGab, function(req, res){
  req.gab.remove()
  .then(function(){
    res.redirect('/')
  })
  .catch(function(){
    res.status(422).send('COULD NOT DELETE!')
  })
})

module.exports = router
