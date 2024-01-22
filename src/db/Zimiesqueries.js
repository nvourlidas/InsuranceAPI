
const db = require('./db')

function GetAllZimies() {
   const selectQuery = `SELECT * , DATE_FORMAT(inputdate, '%d-%m-%Y') AS inputdate
    FROM zimies
    INNER JOIN contracts ON contracts.conid=zimies.contractid
    INNER JOIN customer ON zimies.customerid=customer.cid
    INNER JOIN insurances ON insurances.inid=zimies.insidid;
    `;
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

function GetZimiaByID(zimid){
    const query = `SELECT * FROM zimies WHERE zid = ?`
    return new Promise((resolve, reject) => {
        db.query(query, [zimid], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function DeleteZimiesById(zimid) {
    const query = `DELETE FROM zimies WHERE zid = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [zimid], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function AddZimies(ZimiesData) {
    const query = `INSERT INTO zimies(insidid, customerid, znumber, poso, status, contractid, inputdate)
                    VALUES(?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        ZimiesData.insidid,
        ZimiesData.customerid,
        ZimiesData.znumber,
        ZimiesData.poso,
        ZimiesData.status,
        ZimiesData.contractid,
        ZimiesData.inputdate
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function UpdateZimies(zid, updates) {
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');

    const query = `UPDATE zimies SET ${setClause} WHERE zid = ?`;

    const values = [...Object.values(updates), zid];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    GetAllZimies,
    AddZimies,
    GetZimiaByID,
    DeleteZimiesById,
    UpdateZimies
    
};