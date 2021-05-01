const AccountModel = require('../../models/account')
const uploadImage = require('../../utils/uploadImage')
const create = (req, res, next) => {
  const data = req.body
  const { userId } = req
  const { image } = data

  AccountModel.findOne({
    username: data.username
  })
    .then(resData => {
      if (resData) {
        req.err = 'Nhân viên đã tồn tại!'
        next('last')
      } else {
        if (image && image !== 'null') {
          uploadImage(image, {}, (err, result) => {
            if (err) {
              req.err = 'Lỗi upload ảnh!'
              return next('last')
            }

            if (result && result.url) {
              const newData = {
                ...data,
                image: {
                  url: result.url,
                  publicId: result.public_ids || result.public_id
                }
              }

              const newAccount = new AccountModel(newData)

              newAccount.save(err => {
                if (err === null) {
                  const { _id, fullName, username, password, image } = newAccount
                  res.json({
                    status: true,
                    message: 'Tạo nhân viên thành công!',
                    staff: {
                      _id, fullName, username, password, image
                    },
                  })
                } else {
                  req.err = `Đăng kí thất bại! + ${err}`
                  next('last')
                }
              })
            }
          })
        } else {
          const newAccount = {
            ...data,
            image: null
          }

          newAccount.save(err => {
            if (err === null) {
              const { _id, fullName, username, password, image } = newAccount
              res.json({
                status: true,
                message: 'Tạo nhân viên thành công!',
                staff: {
                  _id, fullName, username, password, image
                },
              })
            } else {
              req.err = `Đăng kí thất bại! + ${err}`
              next('last')
            }
          })

        }
      }
    })
}

module.exports = create