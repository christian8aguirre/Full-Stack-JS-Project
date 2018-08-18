const express = require('express')
var pageRouter = require('./src/routers/pageRouter')
var apiRouter = require('./src/routers/apiRouter')


const app = express()
const PORT = 3000

app.use ('/', pageRouter)
app.use ('/api', apiRouter)

app.use((req, res)=>{
  res.send('<h1>404 - Page Not Found!</h1>')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})