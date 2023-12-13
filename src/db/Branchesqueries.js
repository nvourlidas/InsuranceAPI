const db = require('./db')


function getAllCBranches() {
    const selectQuery = 'SELECT * FROM  branches ';
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
    getAllCBranches
};