if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('./app').app
const port = require('./app').port

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}!`)
})

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

module.exports = mongoose
