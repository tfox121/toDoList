const bodyParser = require('body-parser')

const request = require('supertest')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const TaskStore = require('./stores/task.store')
const TaskController = require('./controllers/task.controller')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(process.cwd() + '/public'))

// display front page with task list
app.get('/', function (req, res, next) {
  TaskController.serveFrontPage(res, next)
})

// create new task
app.post('/todo/new', (req, res, next) => {
  TaskController.createTask(req, res, next)
})

// complete task
app.post('/todo/complete', (req, res, next) => {
  TaskController.removeById(req, res, next)
})

// url for list of tasks & ids
app.get('/todo/list', (req, res, next) => {
  TaskStore.listTasks()
    .then(data => {
      res.json(data)
    }).catch(err => {
      next(err)
    })
})

module.exports = { app, port }
