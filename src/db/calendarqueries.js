const db = require('./db');

function insertEvent(data, callback) {
    const insertQuery = `
      INSERT INTO calendar (title, start, end)
      VALUES (?, ?, ?)
    `;
    db.query(insertQuery, [...Object.values(data)], callback);
}


function getEvents(callback) {
    const selectQuery = `
      SELECT * FROM calendar
    `;
    db.query(selectQuery, callback);
}

module.exports = {  
    insertEvent,
    getEvents,
};