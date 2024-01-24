const express = require('express')
const router = new express.Router()
const {insertEvent} = require('../db/Usersqueries')


router.post('/calendar',(req, res) => {
    insertEvent(req.body, (err, results) => {
        if (err) {
            console.error('Error inserting into the table:', err);
            return res.status(500).send('Error inserting into the table');
        }
        res.status(200).send();
    });
  });


  module.exports=router