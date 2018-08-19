const express = require('express')
var pageRouter = require('./src/routers/pageRouter')
var apiRouter = require('./src/routers/apiRouter')
//STEP A.1 - Import EJS (view templating engine)
const ejs = require('ejs')
// Import knex
const knex = require('knex')
// Import knexfile.js config
const devConfig = require('./knexfile.js')

//import objection.Model
const { Model } = require('objection')


const app = express()
const PORT = 3000



// STEP - B.1
app.use( express.static( `${__dirname}/public` ) )

// STEP A.2 - Configure EJS as the application
//          view engine
app.engine( 'ejs', ejs.renderFile )
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/src/views`)

/* Data Access Config */
const appDb = knex(devConfig.development)

/* configure our database w/ objection model*/
Model.knex(appDb)

app.locals.db = appDb

// // Test to see that data access works
// appDb.select('*').from('vendors')
//   .then((records)=>{
//     console.log(records)
//   })




app.use ('/', pageRouter)
app.use ('/api', apiRouter)

app.use((req, res)=>{
  res.send('<h1>404 - Page Not Found!</h1>')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})