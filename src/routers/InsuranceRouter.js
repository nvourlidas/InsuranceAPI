const express = require('express')
const router = new express.Router()
const {DeleteInsurance,PostInsurances} = require('../db/Insurancesqueries')

const db = require('../db/db')

router.get('/insurances',(req,res) =>{
    const sql = `SELECT * FROM insurances`
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing the query:', err);
          res.status(500).send('Internal Server Error');
        } else {
          // Send the query results as JSON
          res.json(results);
        }
      });
})

router.delete('/insurances',async (req,res) => {
  const inid = req.body.inid
  try{
    const insurance = await DeleteInsurance(inid)
    res.status(200).send()

  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
})


//KANE TO ID AUTO
router.post('/insurances', async (req, res) => {
  const insuranceData = req.body;

  try {
      await PostInsurances(insuranceData);
      res.status(201).send(); // 201 status for resource creation
  } catch (e) {
      console.log(e);
      res.status(500).send(e);
  }
});



module.exports=router