const express = require('express')
const exphbs  = require('express-handlebars');
const restaurantObj = require('./restaurant.json')
const restaurantList = restaurantObj.results
const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('home', {restaurants: restaurantList})
})

app.get('/restaurants/:id', (req, res) => {
	res.render('show', {restaurant: restaurantList[req.params.id - 1]})
})

app.get('/search', (req, res) => {
	const keyword = req.query.keyword.toLowerCase()
	const searchResults = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))
	res.render('home', {restaurants: searchResults})
})

app.listen(port, () => console.log(`listening on port ${port}`))
