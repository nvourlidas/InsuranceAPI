const express = require('express')
const router = new express.Router()
const {insertEvent, getEvents, DeleteEvent} = require('../db/calendarqueries')


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


  module.exports=router