const express = require('express')
var cors = require('cors')
const connectToMongo = require('./db')

connectToMongo() 
const app = express()
const port = 5000  

app.use(express.json()) 
app.use(cors())

app.use('/api/auth', require('./routers/auth'))
app.use('/api/notes', require('./routers/notes'))
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})