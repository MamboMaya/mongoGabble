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

router.get('/gabs/:id/edit', function(req, res){
  Gab.findOne({_id: req.params.id})
  .then(function(gab){

  res.render('gabs/edit', {
    user: req.user,
    gab: gab
  })
})
})

router.post('/gabs/:id', function(req, res){
  Gab.findOne({_id: req.params.id})
  .then(function(gab){
    gab.message = req.body.message
    gab.save()
  })
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

router.post('/gabs/:id/delete', function(req, res){
  Gab.deleteOne({_id: req.params.id})
  .then(function(){
    res.redirect('/')
  })
  .catch(function(){
    res.status(422)
  })
})

module.exports = router
