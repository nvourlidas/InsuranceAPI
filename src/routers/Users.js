const express = require('express')
const router = new express.Router()
const {getUsers} = require('../db/Usersqueries')

router.get('/users', (req,res) =>{
    getUsers((err, results) => {
      if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
      }
      res.json(results);
  });
  })

module.exports=router