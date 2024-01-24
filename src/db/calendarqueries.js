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


function DeleteEvent(id) {
    const query = `DELETE FROM calendar WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {  
    insertEvent,
    getEvents,
    DeleteEvent,
};