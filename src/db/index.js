const mongoose = require('mongoose')

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://127.0.0.1:27017/manageweb_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('connect db successfully!')
  } catch(error) {
    console.log(error)
    console.log('connect db failed!')
  }
}

module.exports = { connect }