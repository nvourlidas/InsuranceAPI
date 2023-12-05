const bodyParser = require('body-parser');
const express = require('express')
const UserRouter = require('./routers/CustomersRoute')
const ContractRouter = require('./routers/ContractsRouter')

const app = express()
app.use(bodyParser.json());

const port = process.env.PORT  || 3000

app.use(UserRouter)
app.use(ContractRouter)

app.listen(port, ()=>{
    console.log('Server is running on port: ',port)
})

