const Router = require('express').Router
const pageRoute = Router()

pageRoute
  .get('/', (req, res) => {
    //FORMA NORMAL ==========================================
    // fs.readFile(`${__dirname}/../views/home.html`, 'utf-8')
    //   .then((htmlData)=>{
    //     res.send(htmlData)
    //   }) 
    //FORMA EJS =============================================
    //var currentYear = ( new Date() ).getFullYear()
    //STEP A.3
    //res.render('home.ejs', { copyright: currentYear})

    res.render('home.ejs')
  })


pageRoute
  .get('/about', (req, res)=> {
    res.render('about.ejs')
  })

  // res.send('<h1>ABOUT page</h1>')

  module.exports = pageRoute