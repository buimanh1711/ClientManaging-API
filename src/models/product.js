const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Product = new Schema({
  name: { type: String, maxLength: 255 },
  image: { type: Object, default: { url: '/images/default_img.png' } },
  price: { type: Number, default: 0 },
  category: { type: String, ref: 'category', default: null },
  sold: { type: Number, default: 0 },
  slug: { type: String, slug: "name" },
}, {
  timestamps: true
})

module.exports = mongoose.model('product', Product)