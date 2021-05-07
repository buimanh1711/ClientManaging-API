const ProductModel = require('../../models/product')
const CategoryModel = require('../../models/category')
const getPage = require('../../utils/getPage')
const PAGE_SIZE = 8

const getAll = (req, res, next) => {
  const { search, page } = req.query

  const query = {}
  const { skip, limit } = getPage(page, PAGE_SIZE)
  if (search) query.text = { $regex: search, $options: 'gi'}

  ProductModel.find(query)
    .populate('category', 'title', CategoryModel)
    .skip(skip)
    .limit(limit)
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
    .catch(err => {
      req.err = 'Lỗi lấy sản phẩm ' + err
      next('last')
    })
}

module.exports = getAll