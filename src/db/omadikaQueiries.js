const db = require('./db');


function getOmadika(callback) {
    const selectQuery = `
    SELECT *, DATE_FORMAT(startdate, '%d-%m-%Y') AS startdate, DATE_FORMAT(enddate, '%d-%m-%Y') AS enddate, DATE_FORMAT(paydate, '%d-%m-%Y') AS paydate, DATE_FORMAT(birthday, '%d-%m-%Y') AS birthday
    FROM customer
    JOIN omadika ON customer.cid = omadika.cuid
    JOIN contracts ON contracts.conid = omadika.coid
    INNER JOIN insurances ON insurances.inid=contracts.insuranceid
    INNER JOIN branches ON branches.bid=contracts.branchid
     ORDER BY surname ASC
    `;
    db.query(selectQuery, callback);
}


function getAllOmadika(id) {
    const sql = `SELECT *, DATE_FORMAT(startdate, '%d-%m-%Y') AS startdate, DATE_FORMAT(enddate, '%d-%m-%Y') AS enddate, DATE_FORMAT(paydate, '%d-%m-%Y') AS paydate, DATE_FORMAT(birthday, '%d-%m-%Y') AS birthday
    FROM customer
    JOIN omadika ON customer.cid = omadika.cuid
    JOIN contracts ON contracts.conid = omadika.coid
    WHERE coid = ?
    ;
    `;

    return new Promise((resolve, reject) => {
        db.query(sql,[id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function DeleteOmadika(id) {
    const query = `DELETE FROM omadika WHERE cuid = ?`;

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


function AddOmadiko(omadikaData) {
    const  coid  = omadikaData.coid;
    const cuid = omadikaData.cuid;
    const sql = `INSERT INTO omadika (coid, cuid) VALUES (?,?)`;

    return new Promise((resolve, reject) => {
        db.query(sql, [coid, cuid], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); 
            }
        });
    });
}

module.exports = {  
    getAllOmadika,
    DeleteOmadika,
    AddOmadiko,
    getOmadika
};