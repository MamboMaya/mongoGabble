const express = require('express')
const router = express.Router()
const Gab = require('../models/Gab')

router.get('/', function(req, res){

  Gab.find()
  .then(function(gabs){
    for (var i = 0; i < gabs.length; i++) {
      if(gabs[i].username === req.user.username){
        gabs[i].currentUser = true
      }
    }
    res.render('index', {
      user: req.user,
      gabs: gabs
    })
  })
})


module.exports = router
