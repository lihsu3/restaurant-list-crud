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
  let order = req.query.order
  let keyword = req.query.keyword
  let attBeingSorted = 'name'

  if (order == 'desc') attBeingSorted = '-' + attBeingSorted
  else if (order == 'category') attBeingSorted = 'category'
  else if (order == 'location') attBeingSorted = 'location'

  restaurantModel.find({name: {$regex: keyword, $options: "i"}}).sort(attBeingSorted).exec((err, restaurantList) => {
    if (err) return console.error(err)
    return res.render('home', {restaurants: restaurantList, keyword: req.query.keyword})
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))