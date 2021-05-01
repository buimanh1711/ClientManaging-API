const GuestModel = require('../../models/guest')

const remove = (req, res, next) => {
    const { guestId } = req.params

    GuestModel.deleteOne({
        _id: guestId
    })
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    message: 'Xóa khách hàng thành công!'
                })
            } else {
                req.err = "Không thể xóa"
                next('last')
            }
        })
        .catch(err => {
            req.err = `Lỗi xóa khách hàng! + ${err}`
            next('last')
        })

}

module.exports = remove