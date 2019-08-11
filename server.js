const appVars = require('./app')

appVars.app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${appVars.port}!`)
})
