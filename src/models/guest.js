const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Guest = new Schema({
  fullName: { type: String, maxLength: 128 },
  cmnd: { type: String },
  image: { type: Object, default: { url: '/images/user_default_img.png' } },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  totalMoney: { type: Number, default: 0 }
})

module.exports = mongoose.model('guest', Guest)