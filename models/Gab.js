const mongoose = require('mongoose')

const gabSchema = new mongoose.Schema({
  username: {type: String, required: true},
  message: {type: String, required: true, maxlength: 140},
  totalLikes: {type: Number, default: 0},
  likes: [{
    username: {type: String, required: true},
    value: {type: Number, required: true, default: 0}
  }]
})

const Gab = mongoose.model('Gab', gabSchema)
module.exports = Gab
