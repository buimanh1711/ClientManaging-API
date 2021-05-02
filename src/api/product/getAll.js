const ProductModel = require('../../models/product')

const getAll = (req, res, next) => {
  const { category } = req.query

  const query = {}

  if (category) query.category = category

  ProductModel.find(query)
    .populate('category')
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy sản phẩm thành công!',
          products: resData
        })
      } else {
        req.err = 'Lỗi lấy sản phẩm!'
        next('last')
      }
    })
    .catch(err => next('last'))
}

module.exports = getAll