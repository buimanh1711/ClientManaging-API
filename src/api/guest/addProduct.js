const GuestModel = require('../../models/guest')

const addProduct = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { productId, totalMoney, quantity } = data
  
  GuestModel.updateOne({
    _id
  }, {
    totalMoney: parseInt(totalMoney),
    $push: {
      bought: { product: { _id: productId }, quantity }
    }
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Cập nhật khách hàng thành công!'
        })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi cập nhật! ' + err
      next('last')
    })
}

module.exports = addProduct