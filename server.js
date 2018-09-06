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

// A.1 - Import Auth libraries
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

// A.2- Import configuration functions
const registerLocalStrategy = require('./src/middleware/passport-local--registerLocalStrategy.js')
const { configDeserializeUser, configSerializeUser } = require('./src/helpers/passport-local--sessionActions.js')

//A.3 - Import authRouter and create router middleware
const authRouter = require('./src/routers/authRouter')


const app = express()
const PORT = 8000

//===================================================================================================

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

if(typeof process.env.NODE_ENV === 'undefined'){
  console.log("YOU MUST DEFINE THE NODE_ENV!!!")
  process.exit()
}

//A.3a - Configure cookie parser/session libraries + middleware n
app.use( cookieParser() )
app.use( cookieSession({
  name: 'cookiesession',
  secret: 'supercookiesecret',
  httpOnly: true,
  signed: false
}))


//A.3b - Configure passport + session middleware
app.use(passport.initialize())
app.use(passport.session())
passport.use(registerLocalStrategy())
passport.serializeUser(configSerializeUser())
passport.deserializeUser(configDeserializeUser())


//create router middleware 
app.use('/auth', authRouter)
//Routers in express
app.use ('/api', apiRouter)
app.use ('/', pageRouter)

//if no routes match, send reactApp.ejs to client.
app.use((req, res)=>{
  res.render('reactApp.ejs')
})

app.use((req, res)=>{
  res.send('<h1>404 - Page Not Found!</h1>')
})

app.listen(PORT, ()=>{
  console.log('==========================')
  console.log(`App listening on localhost:${PORT}`);
  console.log(`Environment : ${process.env.NODE_ENV}`)
  console.log('==========================')
})