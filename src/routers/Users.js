const express = require('express')
const router = new express.Router()
const {getUsers, insertUser} = require('../db/Usersqueries')

router.get('/users', (req,res) =>{
    getUsers((err, results) => {
      if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
      }
      res.json(results);
  });
  })

  router.post('/user',(req, res) => {
    insertUser(req.body, (err, results) => {
        if (err) {
            console.error('Error inserting into the table:', err);
            return res.status(500).send('Error inserting into the table');
        }
        res.status(200).send();
    });
  });

module.exports=router