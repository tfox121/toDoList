const TaskStore = require('../stores/task.store')

class TaskController {
  // add task => re-render at root
  static createTask (req, res, next) {
    TaskStore.createTask(req.body.todo)
      .then(() => TaskStore.listTasks())
      .then(setTimeout(() => {
        res.redirect('/')
      }, 0)
      )
      .catch(err => {
        next(err)
      })
  }

  // delete task => re-render at root
  static removeById (req, res, next) {
    TaskStore.removeById(req.body.delete)
      .then(() => TaskStore.listTasks())
      .then(setTimeout(() => {
        res.redirect('/')
      }, 0)
      )
      .catch(err => {
        next(err)
      })
  }

  // converts task line to input box to edit
  static openEdit (req, res, next) {
    TaskStore.findTask(req.body.edit)
      .then(id => {
        TaskStore.listTasks()
          .then(data => {
            res.render('fullList.njk', { data, id })
          }).catch(err => {
            next(err)
          })
      })
  }

  static submitEdit (req, res, next) {
    TaskStore.editTask(req.body)
      .then(setTimeout(() => {
        res.redirect('/')
      }, 0)
      )
      .catch(err => {
        next(err)
      })
  }

  // serve tasks & IDs as JSON
  static listTasks (req, res, next) {
    TaskStore.listTasks(res, next)
      .then(data => {
        res.json(data)
      }).catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController
