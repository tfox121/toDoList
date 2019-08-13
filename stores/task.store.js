const Task = require('../models/task.model')

class TaskStore {
  // return list of all task database objects
  static listTasks () {
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

  // add new task to database
  static createTask (req) {
    return new Promise((resolve, reject) => {
      var newTask = new Task({
        task: req
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

  // find task by id, return task database object
  static findTask (req) {
    return new Promise((resolve, reject) => {
      Task.findById(req).select('_id, task').exec((err, task) => {
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

  // find task by id, return edited database object
  static editTask (req) {
    return new Promise((resolve, reject) => {
      Task.updateOne(
        { _id: Object.keys(req)[0] },
        { task: Object.values(req)[0] },
        (err, task) => {
          if (!err) {
            console.log('Updating task')
            resolve(task)
          } else {
            console.log('Task update error')
            reject(err)
          }
        })
    })
  }

  // find task by id and delete
  static removeById (req) {
    return new Promise((resolve, reject) => {
      Task.find({ _id: req }).deleteOne((err, data) => {
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
}

module.exports = TaskStore
