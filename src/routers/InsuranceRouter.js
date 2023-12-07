const express = require('express')
const router = new express.Router()

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


module.exports=router