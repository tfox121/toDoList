const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const homeRoute = require('./routes/home.route')
const taskRoute = require('./routes/task.route')

app.use('/public', express.static(path.join(process.cwd(), '/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', homeRoute)
app.use('/todo', taskRoute)

module.exports = app
