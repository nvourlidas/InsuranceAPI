const db = require('./db')


function getAllCovers() {
    const selectQuery = 'SELECT * FROM  covers ';
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
    getAllCovers
};