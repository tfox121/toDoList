const TaskStore = require('../stores/task.store')

class TaskController {
  // display tasks
  static serveFrontPage (res, next) {
    TaskStore.listTasks()
      .then(data => {
        res.render('fullList.njk', { data })
      }).catch(err => {
        next(err)
      })
  }

  // add task => re-render at root
  static createTask (req, res, next) {
    TaskStore.createTask(req.body.todo)
      .then(data => {
        return TaskStore.listTasks()
      }).then(data => {
        res.redirect('/')
      }).catch(err => {
        next(err)
      })
  }

  // delete task => re-render at root
  static removeById (req, res, next) {
    TaskStore.removeById(req.body.delete)
      .then(data => {
        return TaskStore.listTasks()
      }).then(data => {
        res.redirect('/')
      }).catch(err => {
        next(err)
      })
  }

  // serve tasks & IDs as JSON
  static listTasks (res, next) {
    TaskStore.listTasks(res, next)
      .then(data => {
        res.json(data)
      }).catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController
