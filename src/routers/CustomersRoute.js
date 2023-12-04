const db = require('../db/db')
const express = require('express')
const router = new express.Router()
const cors = require('cors')

router.use(cors());

router.post('/customer', (req, res) => {
    const { name, surname, email, cellphone, phone, gender, postcode, property, birthday,afm } = req.body;
    if (typeof name !== 'string' ||typeof surname !== 'string' ||typeof email !== 'string' ||typeof cellphone !== 'string' ||typeof phone !== 'string' ||
        typeof gender !== 'string' ||
        typeof postcode !== 'number' ||
        typeof property !== 'string') {
        res.status(400).send('Invalid data types');
        return;
    }


    const insertQuery = `
      INSERT INTO customer (name, surname, email, cellphone, phone, gender, postcode, property, birthday,afm)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
    db.query(insertQuery,[name, surname, email, cellphone, phone, gender, postcode, property, birthday,afm],(err, results) => {
        if (err) {
          console.error('Error inserting into the table:', err);
          res.status(500).send('Error inserting into the table');
          return;
        }
        res.status(200).send();
      }
    )
})

router.get('/customer', (req,res) =>{
    const insertQuery = `
      SELECT * FROM customer
    `;
    db.query(insertQuery, (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json(results);
        }
      });
})

router.delete('/customer', (req, res) => {
    const { name, surname, email } = req.body;
//Check if the user is providing the necessary data(name, lastname, email)
    if (!name || !surname || !email) {
        return res.status(400).send('Bad Request: Name, surname, and email are required');
      }     
// Check if the customer exists
    const checkQuery = `
      SELECT * FROM customer
      WHERE name = ? AND surname = ? AND email = ?
    `;
    db.query(checkQuery, [name, surname, email], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send('Internal Server Error');
      }
// Check if the customer was found
      if (result.length === 0) {
        return res.status(404).send('Customer not found');
      }
// If the customer exists, proceed with deletion
      const deleteQuery = `
        DELETE FROM customer
        WHERE name = ? AND surname = ? AND email = ?
      `;
      db.query(deleteQuery, [name, surname, email], (err, result) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('User is deleted');
      });
    });
})
  
module.exports=router