



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
        INSERT INTO contracts (conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, paymentmethod,omadiko,pinakida)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
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
        contractData.paymentmethod,
        contractData.omadiko,
        contractData.pinakida,
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

function ContractsInsurance() {
    const selectQuery = `
    SELECT *, DATE_FORMAT(startdate, '%d-%m-%Y') AS startdate, DATE_FORMAT(enddate, '%d-%m-%Y') AS enddate
    FROM insurances
    INNER JOIN contracts ON insurances.inid=contracts.insuranceid
    INNER JOIN branches ON branches.bid=contracts.branchid;
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

function deleteContract(ConId, callback) {
    const checkQuery = `
      SELECT * FROM contracts
      WHERE conid =?
    `;

    db.query(checkQuery, [ConId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return callback(err, null);
        }

        if (result.length === 0) {
            return callback(null, { notFound: true });
        }

        const deleteQuery = `
            DELETE FROM contracts
            WHERE conid =?
        `;
        db.query(deleteQuery, [ConId], callback);
    });
}

function getContractsAndCustomer(){
    const insertQuery = `
    SELECT * , DATE_FORMAT(startdate, '%d-%m-%Y') AS startdate, DATE_FORMAT(enddate, '%d-%m-%Y') AS enddate, DATE_FORMAT(paydate, '%d-%m-%Y') AS paydate
    FROM contracts
    INNER JOIN customer ON contracts.custid=customer.cid
    INNER JOIN insurances ON insurances.inid=contracts.insuranceid
    INNER JOIN branches ON branches.bid=contracts.branchid;
`;
return new Promise((resolve, reject) => {
    db.query(insertQuery,(err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
});

}

function getContractById(conid){
    const insertQuery = `
        SELECT * FROM contracts
        WHERE conid = ?
    `
    return new Promise((resolve, reject) => {
        db.query(insertQuery, [conid], (err, results) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function UpdateContracts(id,updates){
    const insertQuery =` UPDATE contracts SET ? WHERE conid =? `;

    return new Promise((resolve,reject) =>{
        db.query(insertQuery,[updates,id],(err,results) =>{
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })

}

module.exports = {
    getAllContracts,
    createContract,
    getUserbyAFM,
    ContractsInsurance,
    deleteContract,
    getContractsAndCustomer,
    UpdateContracts,
    getContractById
};
