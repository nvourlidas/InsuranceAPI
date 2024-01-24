const db = require('./db');

function insertEvent(data, callback) {
    const insertQuery = `
      INSERT INTO calendar (title, start, end)
      VALUES (?, ?, ?)
    `;
    db.query(insertQuery, [...Object.values(data)], callback);
}


module.exports = {  
    insertEvent,
};