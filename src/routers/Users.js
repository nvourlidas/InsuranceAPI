const express = require('express')
const router = new express.Router()
const {getUsers, insertUser, updateUser, getCustomerById} = require('../db/Usersqueries')

router.get('/users', (req,res) =>{
    getUsers((err, results) => {
      if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
      }
      res.json(results);
  });
  })

  router.post('/users',(req, res) => {
    insertUser(req.body, (err, results) => {
        if (err) {
            console.error('Error inserting into the table:', err);
            return res.status(500).send('Error inserting into the table');
        }
        res.status(200).send();
    });
  });


  router.patch('/users/:id', async (req, res) => {
    const customerId = req.params.id;
    const updates = req.body;
    const check = Object.keys(req.body);
    const allowedProperties  = ['name','surname', 'username','password','email']
    const allUpdatesExist = check.every(key => allowedProperties.includes(key));
    
    if (!allUpdatesExist) {
      res.status(505).send('Invalid argument')
    }
    try {
        const existingCustomer = await getCustomerById(customerId);
        if (!existingCustomer) {
            return res.status(404).send('Customer not found');
        }
        await updateUser(customerId, updates);
        res.status(200).send('Customer updated successfully');
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).send('Internal Server Error');
    }
  });

module.exports=router