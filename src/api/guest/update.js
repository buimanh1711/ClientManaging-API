const ProductModel = require('../../models/product')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  
  ProductModel.updateOne({
    _id
  }, data)
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Cập nhật thành công!'
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

module.exports = update