const AccountModel = require('../../models/account')
const removeImage = require('../../utils/removeImage')

const remove = (req, res, next) => {
  const { userRole } = req
  const { staffId } = req.params
  const image = req.body

  if (userRole === 'admin') {
      AccountModel.deleteOne({
          _id: staffId
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
                      status: true,
                      message: "Xóa nhân viên thành công!"
                  })

              } else {
                  req.err = "Không thể xóa"
                  next('last')
              }
          })
          .catch(err => {
              req.err = `Lỗi xóa nhân viên! + ${err}`
              next('last')
          })
  } else {
      req.err = 'Lỗi xóa nhân viên!'
      next('last')
  }
}

module.exports = remove