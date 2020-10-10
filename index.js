const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const napiRoutes = require('./routes/napi')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(napiRoutes)

async function start() {
  try {
    await mongoose.connect('mongodb+srv://adel:aqswde@cluster0.ajywq.mongodb.net/napi', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    app.listen(3000, () => {
      console.log(`Server has been started on ${PORT} port...`)
    })
  } catch (er) {
    console.log(er)
  }
}

start()