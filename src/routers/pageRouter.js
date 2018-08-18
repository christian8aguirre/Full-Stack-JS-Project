const Router = require('express').Router
const pageRoute = Router()

pageRoute
  .get('/', (req, res) => {
    res.send('<h1>HOME page</h1>')
  })

pageRoute
  .get('/about', (req, res)=> {
    res.send('<h1>ABOUT page</h1>')
  })

  module.exports = pageRoute