const GuestModel = require('../../models/guest')

const addProduct = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { product } = data

  GuestModel.updateOne({
    _id
  }, {
    totalMoney: data.totalMoney,
    $push: {
      bought: { product: {_id: product._id }}
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