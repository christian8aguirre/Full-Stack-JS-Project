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

// ** A.1 Install + IMPORT BODY PARSER **
///   library allows application to read (parse)
//    json in the body of a POST/PUT/DELETE request
const bodyParser = require('body-parser')



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


// ** A.2 Configure body parser as middleware for
//        express application.   **
// ^^ ... before your app routers in express
// app.use('/', pageRouter)
// app.use('/apiRouter', apiRouter)

app.use( bodyParser.urlencoded({extended: false}) )
app.use( bodyParser.json() )



//Routers in express
app.use ('/', pageRouter)
app.use ('/api', apiRouter)

app.use((req, res)=>{
  res.send('<h1>404 - Page Not Found!</h1>')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})