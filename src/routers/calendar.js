const express = require('express')
const router = new express.Router()
const {insertEvent, getEvents, DeleteEvent, getCustomerById, updateEvent} = require('../db/calendarqueries')


router.post('/calendar',(req, res) => {
    const allday = req.body.allDay
    insertEvent(req.body, allday, (err, results) => {
        if (err) {
            console.error('Error inserting into the table:', err);
            return res.status(500).send('Error inserting into the table');
        }
        res.status(200).send();
    });
  });


  router.get('/calendar', (req,res) =>{
    getEvents((err, results) => {
      if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
      }
      res.json(results);
  });
  })


  router.delete('/calendar',async (req,res) => {
    const id = req.body.id
    try{
      const eventdel = await DeleteEvent(id)
      res.status(200).send(eventdel)
  
    }catch(e){
      console.log(e)
      res.status(500).send(e)
    }
  })


  router.patch('/calendar/:id', async (req, res) => {
    const customerId = req.params.id;
    const updates = req.body;
    const check = Object.keys(req.body);
    const allowedProperties  = ['end']
    const allUpdatesExist = check.every(key => allowedProperties.includes(key));
    
    if (!allUpdatesExist) {
      res.status(505).send('Invalid argument')
    }
    try {
        const existingCustomer = await getCustomerById(customerId);
        if (!existingCustomer) {
            return res.status(404).send('Customer not found');
        }
        await updateEvent(customerId, updates);
        res.status(200).send('Customer updated successfully');
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).send('Internal Server Error');
    }
  });


  module.exports=router