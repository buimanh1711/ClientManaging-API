const express = require('express')
const editAvt = require('../api/account/editAvt')
const editInfo = require('../api/account/editInfo')
const create = require('../api/account/create')
const getOne = require('../api/account/getOne')
const auth = require('../middlewares/auth')
const router = express.Router()

router.put('/:_id/avt', auth, editAvt)
router.put('/:_id', auth, editInfo)
router.post('/', auth, create)
router.get('/:_id', getOne)
module.exports = router