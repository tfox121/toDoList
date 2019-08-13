const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/home.controller')

// display front page with task list
router.get('/', HomeController.serveFrontPage)

module.exports = router
