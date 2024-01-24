const db = require('./db');

function insertEvent(data, allday, callback) {
    const insertQuery = `
      INSERT INTO calendar (title, start, end, allDay)
      VALUES (?, ?, ?, ?)
    `;

    if(allday) {
        var newallday = 0
    }else {
        var newallday = 1
    }

    const values = [ 
        data.title,
        data.start,
        data.end,
        newallday
    ]

    db.query(insertQuery, values, callback);
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