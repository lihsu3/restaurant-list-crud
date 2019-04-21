// routes/home.js
const express = require('express')
const router = express.Router()
const restaurantModel = require('../models/restaurantModel')

router.get('/', (req, res) => {
  restaurantModel.find({}).sort({name: 'asc'}).exec((err, restaurantList) => {
    if (err) return console.error(err)
    return res.render('home', { restaurants: restaurantList })
  })
})

module.exports = router