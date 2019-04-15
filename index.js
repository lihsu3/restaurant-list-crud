const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantModel = require('./models/restaurantModel')
// const restaurantObj = require('./restaurant.json')
// const restaurantList = restaurantObj.results
const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  restaurantModel.find((err, restaurantList) => {
    if (err) return console.error(err)
    return res.render('home', { restaurants: restaurantList })
  })
})

// route to add restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// display the detail of restaurant
app.get('/restaurants/:id', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// list all restaurant
// app.get('/todos', (req, res) => {
  // res.send('list all Todo')
// })

// Add restaurant
app.post('/restaurants', (req, res) => {
  const newRestaurant = new restaurantModel({ name: req.body.name })

  newRestaurant.save(err => {
    if (err) return console.error(err);
    res.redirect('/')
  })
})

// route to edit restaurant
app.get('/restaurants/:id/edit', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// edit restaurant
app.post('/restaurants/:id', (req, res) => {
  restaurantModel.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)

    restaurant.name = req.body.name
    restaurant.save(err => {
      if (err) return console.error(err);
      res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// delete restaurant
app.post('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
	// const keyword = req.query.keyword.toLowerCase()
	// const searchResults = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))
	// res.render('home', {restaurants: searchResults})
})

app.listen(port, () => console.log(`listening on port ${port}`))
