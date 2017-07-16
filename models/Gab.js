const mongoose = require('mongoose')

const gabSchema = new mongoose.Schema({
  username: {type: String, required: true},
  message: {type: String, required: true, maxlength: 140},
  likes: {type: Number, default: 0}
})

const Gab = mongoose.model('Gab', gabSchema)
module.exports = Gab
