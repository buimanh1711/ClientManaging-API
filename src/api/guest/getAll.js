const ProductModel = require('../../models/product')

const getAll = (req, res, next) => {
  const { address } = req.query

  let start = req.query.start
  let end = req.query.end

  if (start < 0) start = 0
  if (end === 0) end = 99999999999999999999
  const query = {
    address
  }

  ProductModel.find(query)
    .where('totalMoney')
    .gte(parseInt(start))
    .lt(parseInt(end))
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy khách hàng thành công!',
          guests: resData
        })
      } else {
        req.err = 'Lỗi lấy khách hàng!'
        next('last')
      }
    })
    .catch(err => {
      req.err = `Lỗi lấy khách hàng! + ${err}`
      next('last')
    })
}

module.exports = getAll