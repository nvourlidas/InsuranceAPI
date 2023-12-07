//NA KANW ENA ROUTER GIA SUMBOLAIO
//THA PAINEW APO TO REQ.BODY TO AFM KAI ME ENA SELECT THA BRISKW TO CUSTOMER ID KAI THA TO APOTHIKEYW STO PINAKA GIA TA SUMBOLAIA
//UPDATE ROUTE SIMBOLAIO
const express = require('express')
const router = new express.Router()
const {getAllContracts,createContract,getUserbyAFM,ContractsInsurance,ContractsBranch} = require('../db/Contractqueries')
const db = require('../db/db')

router.get('/contracts', async(req,res) =>{
    try{
        const contracts = await getAllContracts();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
})

// routes/contracts.js
router.post('/contracts', async (req, res) => {
    const customerafm = req.body.afm;
    const contractData = req.body;

    try {
        // Find the custid by afm
        const customerID = await getUserbyAFM(customerafm);

        if (!customerID) {
            return res.status(404).send('Customer not found');
        }

        // Create a new contract in the database using the found custid
        const newContract = await createContract(contractData, customerID);
        console.log(customerID);

        res.status(201).json(newContract);
    } catch (e) {
        console.error('Error creating contract:', e);
        res.status(500).send('Internal Server Error');
    }
});


router.get("/contracts-insurance", async (req, res) => {
    try{
        const contracts = await ContractsInsurance();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
  });

  router.get("/contracts-branch", async (req, res) => {
    try{
        const contracts = await ContractsInsurance();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
  });

module.exports=router