const ProductModel = require('../../models/product')

const getOne = (req, res, next) => {
    const { _id } = req.params

    ProductModel.findOne({ _id })
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    guest: resData
                })
            } else {
                req.err = 'Không tìm thấy khách hàng!'
                next('last')
            }
        })
}

module.exports = getOne