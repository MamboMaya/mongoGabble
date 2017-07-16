const express = require('express')
const router = express.Router()
const Gab = require('../models/Gab')

router.get('/', function(req, res){

  Gab.find()
  .then(function(gabs){
    res.render('index', {
      user: req.user,
      gabs: gabs
    })
  })
})


module.exports = router
