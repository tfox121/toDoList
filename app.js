
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bodyParser = require('body-parser')

const request = require('supertest')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

const mongoose = require('mongoose')
const shortid = require('shortid')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

const ToDoSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  task: { type: String, required: true }
})

const Task = mongoose.model('Task', ToDoSchema)

// add new task to database
const createTask = (task) => {
  return new Promise((resolve, reject) => {
    var newTask = new Task({
      task: task
    })
    newTask.save((err, task) => {
      if (!err) {
        console.log('Creating task')
        resolve(task)
      } else {
        console.log('Task create error')
        reject(err)
      }
    })
  })
}

// return list of all task database objects
const listTasks = () => {
  return new Promise((resolve, reject) => {
    Task.find({}).select('_id, task').exec((err, list) => {
      if (!err) {
        console.log('Listing tasks')
        resolve(list)
      } else {
        console.log('Task list error')
        reject(err)
      }
    })
  })
}

// find task by id, return task database object
const findTask = (taskId) => {
  return new Promise((resolve, reject) => {
    Task.findById(taskId).select('_id, task').exec((err, task) => {
      if (!err) {
        console.log('Finding task')
        resolve(task)
      } else {
        console.log('Task find error')
        reject(err)
      }
    })
  })
}

// find task by id and delete

const removeById = (taskId) => {
  return new Promise((resolve, reject) => {
    Task.find({ _id: taskId }).remove((err, data) => {
      if (!err) {
        console.log('Deleting task')
        resolve(data)
      } else {
        console.log('Task delete error')
        reject(err)
      }
    })
  })
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res, next) {
  listTasks()
    .then(data => {
      res.render('fullList.njks', { data })
    }).catch(err => {
      next(err)
    })
})

// create new / remove task
app.post('/', (req, res, next) => {
  const action = req.body.todo ? createTask(req.body.todo) : removeById(Object.keys(req.body))
  action
    .then(data => {
      return listTasks()
    }).then(data => {
      res.redirect('/')
    }).catch(err => {
      next(err)
    })
})

// display list of tasks
app.get('/todo/list', (req, res, next) => {
  listTasks()
    .then(data => {
      res.json(data)
    }).catch(err => {
      next(err)
    })
})

module.exports = { app, port }
