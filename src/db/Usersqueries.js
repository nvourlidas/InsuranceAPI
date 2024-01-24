const db = require('./db');

function getUsers() {
    const selectQuery = 'SELECT * FROM Users';
    return new Promise((resolve, reject) => {
        db.query(selectQuery, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {  
    getUsers,
    
};