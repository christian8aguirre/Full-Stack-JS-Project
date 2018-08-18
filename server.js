const express = require('express')


const app = express()
const PORT = 3000

app.use((req, res)=>{
  res.send('<h1> Esto es el inicio ...</h1>')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})