const TaskStore = require('../stores/task.store')

class HomeController {
  // serves the front page
  static serveFrontPage (req, res, next) {
    TaskStore.listTasks()
      .then(data => {
        res.render('fullList.njk', { data })
      }).catch(err => {
        next(err)
      })
  }
}
module.exports = HomeController
