const db = require('./db');

function GetDelContrancts() {
    const query = `SELECT * FROM delcontracts`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = GetDelContrancts;
