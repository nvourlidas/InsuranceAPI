const db = require('./db')

function getAllContracts() {
    const selectQuery = 'SELECT * FROM contracts';
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


function getUserbyAFM(afm) {
    const selectQuery = 'SELECT cid FROM customer WHERE afm = ?';

    return new Promise((resolve, reject) => {
        db.query(selectQuery, [afm], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const customerID = results[0] ? results[0].cid : null;
                resolve(customerID);
            }
        });
    });
}


function createContract(contractData, customerID) {
    const insertQuery = `
        INSERT INTO contracts (conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, paymentmethod)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        contractData.conumber,
        customerID,
        contractData.insuranceid,
        contractData.branchid,
        contractData.startdate,
        contractData.enddate,
        contractData.clear,
        contractData.mikta,
        contractData.promithia,
        contractData.paymentmethod
    ];

    return new Promise((resolve, reject) => {
        db.query(insertQuery, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const newContractId = results.insertId;
                resolve({ id: newContractId, ...contractData });
            }
        });
    });
}




module.exports = {
    getAllContracts,
    createContract,
    getUserbyAFM
};