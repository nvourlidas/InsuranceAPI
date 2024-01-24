const db = require('./db');

function getUsers(callback) {
    const selectQuery = `
      SELECT * FROM Users
    `;
    db.query(selectQuery, callback);
}

function insertUser(data, callback) {
    const insertQuery = `
      INSERT INTO customer (name, surname, username, password, email)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [...Object.values(data)], callback);
}

module.exports = {  
    getUsers,
    insertUser,
};