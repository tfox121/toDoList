const mongoose = require('mongoose')
const shortid = require('shortid')

const ToDoSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  task: { type: String, required: true }
})

const Task = mongoose.model('Task', ToDoSchema)

module.exports = Task
