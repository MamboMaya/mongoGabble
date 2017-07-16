const express = require('express')
const router = express.Router()
const Gab = require('../models/Gab')

router.post('/gabs/:id/like', function(req, res){
  Gab.findOne({_id: req.params.id})
  .then(function(gab){
    gab.likes += 1
    gab.save()
    .then(function(gab){
      res.redirect('/')
    })
  })
})

module.exports = router
