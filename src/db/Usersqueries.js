const db = require('./db');

function getUsers(callback) {
    const selectQuery = `
      SELECT * FROM Users
    `;
    db.query(selectQuery, callback);
}

module.exports = {  
    getUsers,
    
};