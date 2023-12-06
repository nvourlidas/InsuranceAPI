
//DATABASE CONNECTION
const mysql = require('mysql2')

const db= mysql.createConnection({
    host: "94.130.204.38",
    user: "nikosvour",
    password: "123456",
    database: 'yivfclqm_insuranceApi',
    port: '3306'
   });

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL!');
  });
module.exports=db

// CREATE USER 'user2'@'localhost' IDENTIFIED BY 'G#h2T!pR8sY6';
// GRANT ALL PRIVILEGES ON *.* TO 'user2'@'localhost' WITH GRANT OPTION;
// CREATE USER 'user2'@'%' IDENTIFIED BY 'G#h2T!pR8sY6';
// GRANT ALL PRIVILEGES ON *.* TO 'user2'@'%' WITH GRANT OPTION;


// user: "user2",
// password: "G#h2T!pR8sY6",