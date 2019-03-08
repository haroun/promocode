const express = require('express')
const promocode = require('./promocode')

const router = new express.Router()

router.use('/promocode', promocode)

module.exports = router
