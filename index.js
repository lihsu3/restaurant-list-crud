const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantModel = require('./models/restaurantModel')
const methodOverride = require('method-override')
// const restaurantObj = require('./restaurant.json')
// const restaurantList = restaurantObj.results
const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/search', (req, res) => {
	const keyword = req.query.keyword.toLowerCase()
	const searchResults = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))
	res.render('home', {restaurants: searchResults})
})

app.listen(port, () => console.log(`listening on port ${port}`))
