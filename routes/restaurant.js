// routes/restauraut.js
const express = require('express')
const router = express.Router()
const restaurantModel = require('../models/restaurantModel')

// route to add restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

// Add restaurant
router.post('', (req, res) => {
  const newRestaurant = new restaurantModel({ 
  	name: req.body.name, 
  	category: req.body.category, 
  	location: req.body.location, 
  	rating: req.body.rating })

  newRestaurant.save(err => {
    if (err) return console.error(err);
    res.redirect('/')
  })
})

// display the detail of restaurant
router.get('/:id', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// list all restaurant
// router.get('/todos', (req, res) => {
  // res.send('list all Todo')
// })

// route to edit restaurant
router.get('/:id/edit', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// edit restaurant
router.put('/:id', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)

    restaurant.name = req.body.name
	restaurant.category = req.body.category
	restaurant.location = req.body.location
	restaurant.rating = req.body.rating
    restaurant.save(err => {
      if (err) return console.error(err);
      res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// delete restaurant
router.delete('/:id/delete', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router