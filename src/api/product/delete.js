const ProductModel = require('../../models/product')
const removeImage = require('../../utils/removeImage')

const remove = (req, res, next) => {
  const { _id } = req.params
  const image = req.body

  ProductModel.deleteOne({
    _id: _id
  })
    .then(resData => {
      if (resData) {
        if (image.publicId) {
          removeImage(image.publicId, {}, (err, result) => {
            if (err) {
              console.log('Lỗi xóa ảnh!')
            }
            if (result) {
              console.log('Xóa ảnh thành công')
            }
          })
        }
        res.json({
          status: true
        })
      } else {
        req.err = "Không thể xóa"
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa sản phẩm!'
      next('last')
    })

}

module.exports = remove