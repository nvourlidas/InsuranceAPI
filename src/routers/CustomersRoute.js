const express = require('express')
const router = new express.Router()
const cors = require('cors')
const {post_validator} = require('../middleware/validate')
const  {insertCustomer, getCustomers,deleteCustomer,getCustomerById,updateCustomer}= require('../db/Customerqueries');

router.use(cors());
//POST ROUTE CUSTOMER
router.post('/customer',post_validator,(req, res) => {
  insertCustomer(req.body, (err, results) => {
      if (err) {
          console.error('Error inserting into the table:', err);
          return res.status(500).send('Error inserting into the table');
      }
      res.status(200).send();
  });
});
//GET ROUTE CUSTOMER
router.get('/customer', (req,res) =>{
  getCustomers((err, results) => {
    if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send('Internal Server Error');
    }
    res.json(results);
});
})
//DELETE ROUTE CUSTOMER
router.delete('/customer', async (req, res) => {
  const CustomerId = req.body.id;

  try {
      const result = await deleteCustomer(CustomerId);

      if (result.notFound) {
          res.status(404).send('Customer not found');
      } else {
          res.status(200).send('User is deleted');
      }
  } catch (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
  }
});


//UPDATE ROUTE CUSTOMER 
router.patch('/customer/:id', async (req, res) => {
  const customerId = req.params.id;
  const updates = req.body;
  const check = Object.keys(req.body);
  const allowedProperties  = ['name','surname','email','cellphone','phone','gender','postcode','property','birthday','afm', 'licenseDate']
  const allUpdatesExist = check.every(key => allowedProperties.includes(key));
  
  if (!allUpdatesExist) {
    res.status(505).send('Invalid argument')
  }
  try {
      const existingCustomer = await getCustomerById(customerId);
      if (!existingCustomer) {
          return res.status(404).send('Customer not found');
      }
      await updateCustomer(customerId, updates);
      res.status(200).send('Customer updated successfully');
  } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports=router
