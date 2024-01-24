const db = require('./db');

function getUsers(callback) {
    const selectQuery = `
      SELECT * FROM Users
    `;
    db.query(selectQuery, callback);
}

function insertUser(data, callback) {
    const insertQuery = `
      INSERT INTO Users (name, surname, username, password, email)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [...Object.values(data)], callback);
}

function getCustomerById(customerId) {
    const selectQuery = 'SELECT * FROM Users WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(selectQuery, [customerId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function updateUser(customerId, updates) {
    const updateQuery = 'UPDATE Users SET ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(updateQuery, [updates, customerId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {  
    getUsers,
    insertUser,
    getCustomerById,
    updateUser
};