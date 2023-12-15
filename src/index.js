const bodyParser = require('body-parser');
const express = require('express')
const UserRouter = require('./routers/CustomersRoute')
const ContractRouter = require('./routers/ContractsRouter')
const InsuranceRoute = require('./routers/InsuranceRouter')
const BranchRouter = require('./routers/BrancesRouter')
const CoverRouter = require('./routers/CoversRouter')
const FileRouter = require('./routers/FilesRouter')

const app = express()
app.use(bodyParser.json());

const port = process.env.PORT  || 3000

app.use(UserRouter)
app.use(ContractRouter)
app.use(InsuranceRoute)
app.use(BranchRouter)
app.use(CoverRouter)
app.use(FileRouter)

app.listen(port, ()=>{
    console.log('Server is running on port: ',port)
})

