const db = require('./db')

function GetDeletedCostomers(){
    const query= `SELECT * FROM delcustomer` 
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    GetDeletedCostomers
}