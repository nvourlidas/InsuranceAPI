const db = require('./db');

function getAllOmadika() {
    const sql = `SELECT *
    FROM customer
    JOIN omadika ON customer.cid = omadika.cuid
    JOIN contracts ON contracts.conid = omadika.coid;
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {  
    getAllOmadika
};