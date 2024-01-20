const express = require('express')
const router = new express.Router()
const {getAllContracts,createContract,getUserbyAFM,ContractsInsurance,deleteContract,getContractsAndCustomer,UpdateContracts,getContractById} = require('../db/Contractqueries')

//GET CONTRACTS
router.get('/contracts', async(req,res) =>{
    try{
        const contracts = await getAllContracts();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
})

//ADD A CONTRACT
router.post('/contracts', async (req, res) => {
    const customerafm = req.body.afm;
    const contractData = req.body;

    try {
        const customerID = await getUserbyAFM(customerafm);

        if (!customerID) {
            return res.status(404).send('Customer not found');
        }
        const newContract = await createContract(contractData, customerID);
        console.log(customerID);
        res.status(201).json(newContract);
    } catch (e) {
        console.error('Error creating contract:', e);
        res.status(500).send('Internal Server Error');
    }
});

//ENDPOINT THAT JOINS CONTRACTS AND INSURANSE
router.get("/contracts-insurance", async (req, res) => {
    try{
        const contracts = await ContractsInsurance();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
  });

//ENDPOINT THAT JOINS CONTACTS AND BRANCH
router.get("/contracts-branch", async (req, res) => {
  try{
      const contracts = await ContractsInsurance();
      res.status(200).json(contracts);
  }catch(e){
      res.status(500).send(e)
    }
});

//DELETE A CONTRACT
router.delete('/contracts', (req, res) => {
  const ConId =req.body.id
  
  deleteContract(ConId, (err, result) => {
      if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
      }
  
      if (result.notFound) {
          return res.status(404).send('Customer not found');
      }
  
      res.status(200).send('User is deleted');
  });
});

//CONTRACTS AND CUSTOMER ENDPOITN
router.get('/contracts-customer',async (req, res) => {
  try{
      const contracts = await getContractsAndCustomer()
      res.status(200).json(contracts);
  }catch(e){
      res.status(500).send(e)
  }
});


//UPDATE CONTRACT USING ID
router.patch('/contracts/:id', async (req, res) => {
  const conid = req.params.id;
  const updates = req.body;
  const check = Object.keys(req.body);
  const allowedProperties = ['conumber', 'custid', 'insuranceid', 'branchid', 'startdate', 'enddate', 'clear', 'mikta', 'promithia', 'paymentmethod', 'omadiko', 'pinakida', 'ispaid', 'paydate', 'inform'];
  
  const allUpdatesExist = check.every(key => allowedProperties.includes(key));
    
  if (!allUpdatesExist) {
    return res.status(400).send('Invalid argument');
  }
  try {
    const isContractExisting = await getContractById(conid);
  
    if (!isContractExisting) {
      return res.status(404).send('Contract not found');
    }
    await UpdateContracts(conid, updates);
    res.status(200).send('Contract updated successfully');
  
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});



module.exports=router