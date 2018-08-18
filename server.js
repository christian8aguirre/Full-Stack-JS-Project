const express = require('express')
var pageRouter = require('./src/routers/pageRouter')
var apiRouter = require('./src/routers/apiRouter')
//STEP A.1 - Import EJS (view templating engine)
const ejs = require('ejs')


const app = express()
const PORT = 3000

// STEP - B.1
app.use( express.static( `${__dirname}/public` ) )

// STEP A.2 - Configure EJS as the application
//          view engine
app.engine( 'ejs', ejs.renderFile )
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/src/views`)

app.use ('/', pageRouter)
app.use ('/api', apiRouter)

app.use((req, res)=>{
  res.send('<h1>404 - Page Not Found!</h1>')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})