const Router = require('express').Router
var apiRouter = Router()
const Job = require('../models/Job')
const Company = require('../models/Company')

// apiRouter
//   .get('/jobs', (req, res) =>{
//     res.json([
//       {
//         title: 'SQL Server Administrator - Postgres',
//         description: 'Bring to the table win-win survival strategies to ensure proactive domination. User generated content in real-time will have multiple touchpoints for offshoring.',
//         location: 'Guadalajara',
//         salary: 27000,
//         fullTime: true,
//         companyId: 1
//       },
//       {
//         title: 'UX Engineer',
//         description: 'Override the digital divide with additional clickthroughs from DevOps. Leverage agile frameworks to provide a robust synopsis for high level overviews.',
//         location: 'Monterrey',
//         salary: 35000,
//         fullTime: true,
//         companyId: 1
//       },
//       {
//         title: 'API Architect',
//         description: 'Collaboratively administrate turnkey channels whereas virtual e-tailers. Objectively seize scalable metrics whereas proactive e-services.',
//         location: 'Ciudad de Mexio',
//         salary: 39000,
//         fullTime: true,
//         companyId: 2
//       },
//       {
//         title: 'Mid-Level Front End Engineer',
//         description: 'Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking. Completely pursue scalable customer service through sustainable potentialities.',
//         location: 'Ciudad de Mexico',
//         salary: 21000,
//         fullTime: false,
//         companyId: 2
//       }
//     ])
//   })

// apiRouter
//   .get('/companies', (req, res)=>{
//     res.json([
//         {
//         name: 'Company ABC',
//         description: 'Energistically network alternative technology deploying impactful partnerships.',
//         imageLink: 'http://www.tinygraphs.com/labs/isogrids/hexa16/nsuaio',
//         location: 'Guadalajara'
//       },
//       {
//         name: 'Lossless Enterprises',
//         description: 'Quickly strategizing team driven "outside the box" thinking.',
//         location: 'Ciudad de Mexico',
//         imageLink: 'http://www.tinygraphs.com/labs/isogrids/hexa16/8282',
//       }
//     ])
//   })

//   // DATA ACCESS - multiple records from 'vendors' table //
// apiRouter.get('/vendors', (req, res)=>{

//   // We have access to the knex-db connection on the `req` object
//   //    from when we assigned it to app.locals.db in server.js
//   const db = req.app.locals.db
//   db.select('*').from('vendors')
//     .then((dbRecordsReturned)=>{
//       res.status(200).json(dbRecordsReturned)
//     })
// })


// // DATA ACCESS - single record from 'vendors' table //
// apiRouter.get('/vendors/:_id', (req, res)=>{
//   const db = req.app.locals.db

//   const idInRoute = req.params._id
//   console.log(idInRoute);

//   db.select('*').from('vendors')
//     .where('id', '=', idInRoute)
//     .then((records)=>{
//       res.json(records[0])
//     })

// })

//====================================================
//  DATA ACCESS :: api/jobs

// apiRouter.get('/jobs', (req, res) => {
//   Job
//     .query()
//     .eager('company')
//     .then(records =>{
//       res.status(200).json(records)
//   })

// })


// //====================================================
// //  DATA ACCESS :: api/companies 



// apiRouter.get('/companies', (req, res) => {
//   Company
//     .query()
//     .eager('jobs')
//     .then(records => {
//       res.status(200).json(records)
//     })
// })

// ** B.2 Model Queries **


//=======  Company ====================
const fetchManyCompanies = (req, res) =>{
  Company.query()
  .eager('jobs')
  .then(recordsWithJobs =>{
    res.status(200).json(recordsWithJobs)
  })
  .catch(err => {
    console.log('Errrooooorrr!!!')
    let errorMessage = err.toString()
    res.status(500).send(errorMessage)
  })
}

const fetchOneCompany = (req, res) => {
  const db = req.app.locals.db;
  const idInRoute = req.params.id;

  db.select('*').from('companies')
    .where('id', '=', idInRoute)
    .then(records => {
      res.json(records[0])
    })
}

const createOneCompany = (req, res)=>{
  console.log(req.body);
  Company.query()
    .insert(req.body)
    .then(newRecord =>{
      res.status(200).json(newRecord)
    })
    .catch(err =>{
      res.status(500).json(err.toString())
    })
}

const editOneCompany = (req, res) => {
  Job.query()
    .updateAndFetch(req.params.id, req.body)
    .then(updateCompany =>{
      res.status(200).json(updateCompany)
    })
    .catch(err =>{
      res.status(500).send(err.toString())
    })
}

const deleteOneCompany = (req, res) =>{
  Company.query()
    .deleteById(req.params.id)
    .then(dbResponse =>{
      res.status(200).json(dbResponse === 1 ? `Deleted Company with Register Num. ${req.params.id} ` : `Not exist`)
    })
    .catch(err =>{
      res.status(500).send(err.toString())
    })
}


//=======  Jobs ====================
const fetchManyjobs = async (req, res) => {
  try{
    const recordWithCompany = await Job.query()
      .eager('company')
      res.status(200).json(recordWithCompany)
  } catch (err) {
    let errorMessage = err.toString()
    res.status(500).send(errorMessage)
  }
}

const fetchOneJob = async (req, res) =>{
  try{
    const db = req.app.locals.db;
    const idInRoute = req.params.id;

    db.select('*').from('jobs')
      .where('id', '=', idInRoute)
      .then(records =>{
        res.json(records[0])
      })
  } catch (err) {
    let errorMessage = err.toString()
    res.status(500).send(errorMessage)
  }
}

const createOneJob = (req, res) =>{
  // ** A.3 + B.3 req.body **
  //       body parser + express puts incoming
  //       ContentType application/json
  //       data on req.body
  console.log(req.body)
  Job.query()
  .insert(req.body)
  .then(newRecord =>{
    res.status(200).json(newRecord)
  })
  .catch(err =>{
    var errorMessage = err.toString()
    res.status(500).send(errorMessage)
  })
}

const editOneJob = (req,res) =>{
  Job.query()
    .updateAndFetchById ( req.params.id, req.body )
    .then(updateRecord =>{
      res.status(200).json(updateRecord)
    })
    .catch(err =>{
      var errorMessage = err.toString()
      res.status(500).send(errorMessage)
    })
}

const deleteOneJob = (req, res) =>{
  Job.query()
    .deleteById( req.params.id )
    .then( dbResponse =>{
      res.status(200)
      .json(dbResponse === 1 ? 'Registro Eliminado' : 'No existe el registro')
    })
    .catch(err =>{
      var errorMessage = err.toString()
      res.status(500).send(errorMessage)
    })
}




// ** B.1 REST ROUTES **

apiRouter
  .get('/companies', fetchManyCompanies)
  .get('/companies/:id', fetchOneCompany)
  .post('/companies', createOneCompany)
  .put('/companies/:id', editOneCompany)
  .delete('/companies/:id', deleteOneCompany)


apiRouter
  .get('/jobs', fetchManyjobs)
  .get('/jobs/:id', fetchOneJob)
  .post('/jobs', createOneJob)
  .put('/jobs/:id', editOneJob )
  .delete('/jobs/:id', deleteOneJob)




  module.exports = apiRouter