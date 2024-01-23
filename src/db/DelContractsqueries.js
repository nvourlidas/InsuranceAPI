const db = require('./db');

function GetAllDeletedContracts() {
    const sql = `SELECT * , DATE_FORMAT(startdate, '%d-%m-%Y') AS startdate, DATE_FORMAT(enddate, '%d-%m-%Y') AS enddate, DATE_FORMAT(paydate, '%d-%m-%Y') AS paydate, DATE_FORMAT(birthday, '%d-%m-%Y') AS birthday
    FROM delcontracts
    INNER JOIN customer ON delcontracts.custid=customer.cid
    INNER JOIN insurances ON insurances.inid=delcontracts.insuranceid
    INNER JOIN branches ON branches.bid=delcontracts.branchid
	 ORDER BY enddate ASC;
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

function PermaDeleteContract(conId) {
    return new Promise((resolve, reject) => {
        const deleteQuery = `
            DELETE FROM delcontracts
            WHERE conid = ?
        `;

        db.query(deleteQuery, [conId], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                reject(err);
            } else if (result.affectedRows === 0) {
                resolve({ notFound: true });
            } else {
                resolve({ success: true });
            }
        });
    });
}

function DeleteDeletedCustomer(conId) {
    return new Promise((resolve, reject) => {
        const checkQuery = `
            SELECT * FROM delcontracts
            WHERE conid = ?
        `;

        db.query(checkQuery, [conId], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                reject(err);
            }

            if (result.length === 0) {
                resolve({ notFound: true });
            }

            // Move customer to delcustomer table
            const moveQuery = `
                INSERT INTO contracts (conid, conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, paymentmethod, omadiko, pinakida, ispaid, paydate,inform)
                SELECT conid, conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, paymentmethod, omadiko, pinakida, ispaid, paydate,inform
                FROM delcontracts
                WHERE conid = ?;
            `;
            
            // Parameters for the moveQuery
            const moveParams = [conId];

            db.query(moveQuery, moveParams, (err, moveResult) => {
                if (err) {
                    console.error('Error moving customer to delcustomer table:', err);
                    reject(err);
                }

                // Delete customer from customer table
                const deleteQuery = `
                    DELETE FROM delcontracts
                    WHERE conid = ?
                `;

                // Parameters for the deleteQuery
                const deleteParams = [conId];

                db.query(deleteQuery, deleteParams, (err, deleteResult) => {
                    if (err) {
                        console.error('Error deleting customer from customer table:', err);
                        reject(err);
                    }

                    resolve({ success: true });
                });
            });
        });
    });
}




module.exports = {  
    GetAllDeletedContracts,
    PermaDeleteContract,
    DeleteDeletedCustomer
};
