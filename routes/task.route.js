const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/task.controller')

// create new task
router.post('/new', TaskController.createTask)

// complete task
router.post('/complete', TaskController.removeById)

// edit task
router.post('/edit', TaskController.openEdit)

// submit edit task
router.post('/edit/submit', TaskController.submitEdit)

// route for list of tasks & ids
router.get('/list', TaskController.listTasks)

module.exports = router
