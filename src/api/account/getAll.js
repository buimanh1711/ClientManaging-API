const AccountModel = require('../../models/account')
const getPage = require('../../utils/getPage')
const PAGE_SIZE = 8

const getAll = (req, res, next) => {
  const { page } = req.query || 1

  const { skip, limit } = getPage(page, PAGE_SIZE)

  AccountModel.find({
    role: 'staff'
  })
    .skip(skip)
    .limit(limit)
    .then(resData => {
      if (resData) {
        AccountModel.countDocuments({
          role: 'staff'
        })
          .then(count => {
            if (count) {
              res.json({
                status: true,
                message: 'Lấy nhân viên thành công!',
                staffs: resData,
                page: parseInt(page),
                totalPage: Math.ceil(count / PAGE_SIZE),
                totalStaffs: count
              })
            } else {
              req.err = 'Lỗi lấy nhân viên!'
              next('last')
            }
          })
      } else {
        req.err = 'Lỗi lấy nhân viên!'
        next('last')
      }
    })
    .catch(err => {
      req.err = `Lỗi lấy nhân viên! + ${err}`
      next('last')
    })
}

module.exports = getAll