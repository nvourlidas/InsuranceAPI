const bodyParser = require('body-parser');
const express = require('express')
const UserRouter = require('./routers/CustomersRoute')
const ContractRouter = require('./routers/ContractsRouter')
const InsuranceRoute = require('./routers/InsuranceRouter')
const BranchRouter = require('./routers/BrancesRouter')
const CoverRouter = require('./routers/CoversRouter')
const FileRouter = require('./routers/FilesRouter')
const ZimiesRouter = require('./routers/ZimiesRouter')
const DeletedCostumers = require('./routers/DeletedCustomersRouter')
const DeletedContracts = require('./routers/DelContractsRouter')
const Omadika = require('./routers/omadika')
// const LoginRouter = require('./routers/Login')

const app = express()
app.use(bodyParser.json());

const port = process.env.PORT  || 3000

app.use(UserRouter)
app.use(ContractRouter)
app.use(InsuranceRoute)
app.use(BranchRouter)
app.use(CoverRouter)
app.use(FileRouter)
app.use(ZimiesRouter)
app.use(DeletedCostumers)
app.use(DeletedContracts)
app.use(Omadika)
// app.use(LoginRouter)

app.listen(port, ()=>{
    console.log('Server is running on port: ',port)
})

