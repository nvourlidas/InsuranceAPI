
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

function createContract(contractData, customerID, customers) {
    const insertQuery = `
        INSERT INTO contracts (conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, paymentmethod,omadiko,pinakida, ispaid, paydate,inform)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)
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
        contractData.ispaid,
        contractData.paydate,
        contractData.inform,
    ];

    return new Promise((resolve, reject) => {
        db.query(insertQuery, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                let custid_array = []
                const newContractId = results.insertId;
                if (contractData.omadiko == 1) {
                    custid_array = customers.map(item => item.cid)

                    for (var i = 0; i < custid_array.length; i++) {
                        const insertQuery2 = `INSERT INTO omadika (coid, cuid) VALUES (?,?)`

                        db.query(insertQuery2, [newContractId, custid_array[i]], (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results)
                            }
                        })
                    }
                }
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

function deleteContract(conId, callback) {
    const checkQuery = `
        SELECT * FROM contracts
        WHERE conid = ?
    `;

    db.query(checkQuery, [conId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return callback(err, null);
        }

        if (result.length === 0) {
            return callback(null, { notFound: true });
        }

        const contractToDelete = result[0];

        // Insert the contract into delcontracts
        const insertIntoDelContractsQuery = `
            INSERT INTO delcontracts (conid, conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, paymentmethod, omadiko, pinakida, ispaid, paydate, inform)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const delContractsParams = [
            contractToDelete.conid,
            contractToDelete.conumber,
            contractToDelete.custid,
            contractToDelete.insuranceid,
            contractToDelete.branchid,
            contractToDelete.startdate,
            contractToDelete.enddate,
            contractToDelete.clear,
            contractToDelete.mikta,
            contractToDelete.promithia,
            contractToDelete.paymentmethod,
            contractToDelete.omadiko,
            contractToDelete.pinakida,
            contractToDelete.ispaid,
            contractToDelete.paydate,
            contractToDelete.inform
        ];

        db.query(insertIntoDelContractsQuery, delContractsParams, (err, insertResult) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                return callback(err, null);
            }

            // After successful insertion into delcontracts, proceed to delete from contracts
            const deleteQuery = `
                DELETE FROM contracts
                WHERE conid = ?
            `;

            db.query(deleteQuery, [conId], (err, deleteResult) => {
                if (err) {
                    console.error('Error executing MySQL query:', err);
                    return callback(err, null);
                }

                // Provide some information about the deleted contract
                callback(null, { deletedContract: contractToDelete });
            });
        });
    });
}


function getContractsAndCustomer() {
    const insertQuery = `
    SELECT * , DATE_FORMAT(startdate, '%d-%m-%Y') AS startdate, DATE_FORMAT(enddate, '%d-%m-%Y') AS enddate, DATE_FORMAT(paydate, '%d-%m-%Y') AS paydate, DATE_FORMAT(birthday, '%d-%m-%Y') AS birthday
    FROM contracts
    INNER JOIN customer ON contracts.custid=customer.cid
    INNER JOIN insurances ON insurances.inid=contracts.insuranceid
    INNER JOIN branches ON branches.bid=contracts.branchid
	 ORDER BY enddate;
`;
    return new Promise((resolve, reject) => {
        db.query(insertQuery, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });

}

function getContractById(conid) {
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

function UpdateContracts(id, updates) {
    const insertQuery = ` UPDATE contracts SET ? WHERE conid =? `;

    return new Promise((resolve, reject) => {
        db.query(insertQuery, [updates, id], (err, results) => {
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
