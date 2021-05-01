const GuestModel = require('../../models/guest')

const create = (req, res, next) => {
  const data = req.body

  GuestModel.findOne({
    _id: data._id
  })
    .then(resData => {
      if (resData) {
        req.err = 'Khách hàng đã tồn tại!'
        next('last')
      } else {

        const newGuest = new GuestModel(data)
        newGuest.save(err => {
          if (err === null) {
            res.json({
              status: true,
              message: 'Thêm khách hàng thành công!'
            })
          } else {
            req.err = `Thêm khách hàng thất bại! + ${err}`
            next('last')
          }
        })
      }
    })
    .catch(err => {
      req.err = `Thêm khách hàng thất bại! + ${err}`
      next('last')
    })
}

module.exports = create