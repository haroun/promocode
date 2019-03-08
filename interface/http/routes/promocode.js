const express = require('express')
const promocodeService = require('../../../application/promocode')()

const router = new express.Router()

router.put('/create', async (req, res, next) => {
  try {
    const {name, percent, restrictions} = req.body

    const response = await promocodeService.create({name, percent, restrictions})

    res.status(201).send(response)
  } catch (error) {
    res.status(400).send({error: error.message})

    return
  }

  next()
})

router.post('/validate', async (req, res, next) => {
  try {
    const {name} = req.body
    const {age, weather} = req.body.arguments

    const response = await promocodeService.validate({name, age, weather})

    const statusCode = 200
    res.status(statusCode).send(response)
  } catch (error) {
    res.status(400).send({error: error.message})

    return
  }

  next()
})

module.exports = router
