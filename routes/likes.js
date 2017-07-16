const express = require('express')
const router = express.Router()
const Gab = require('../models/Gab')

router.post('/gabs/:id/like', function(req, res){
  Gab.findOne({_id: req.params.id})
  .then(function(gab){


    // console.log('gabBBB', gab)


    for (var i = 0; i < gab.likes.length; i++) {
      if(gab.likes[i].username === req.user.username){
        console.log('WE HAVE AN UPVOTE!')
        gab.likes.splice(i,1)
      } else {
        console.log('SOMETHINGS WRONG')
      }
    }
// console.log('gab1', gab)
    gab.likes.push({
      username: req.user.username,
      value: 1
    })
// console.log('gab2', gab)
    let likesValue = 0

    for (var i = 0; i < gab.likes.length; i++) {
      likesValue += gab.likes[i].value
    }
    // console.log('gab3', gab)
    gab.totalLikes = likesValue
    gab.save()
    // console.log('gab4', gab)
    .then(function(gab){
      res.redirect('/')
    })
  })
})

module.exports = router
