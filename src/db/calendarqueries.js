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


function getCustomerById(customerId) {
    const selectQuery = 'SELECT * FROM calendar WHERE id = ?';
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

function updateEvent(customerId, updates) {
    const updateQuery = 'UPDATE calendar SET ? WHERE id = ?';
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
    insertEvent,
    getEvents,
    DeleteEvent,
    getCustomerById,
    updateEvent
};