const db = require('./db');

function GetAllDeletedContracts() {
    const sql = `SELECT * FROM delcontracts
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

async function RestoreContract(conId) {
    try {
        // Get the contract details from delcontracts
        const selectQuery = `SELECT * FROM delcontracts WHERE conid = ?`;
        const [contractData] = await db.query(selectQuery, [conId]);

        if (!contractData) {
            // Contract not found in delcontracts
            return { notFound: true };
        }

        // Insert the contract into the contract table
        const insertQuery = `
            INSERT INTO contract (conid, conumber, custid, insuranceid, branchid, startdate, enddate, clear, mikta, promithia, 
                                  paymentmethod, omadiko, pinakida, ispaid, paydate, inform)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            contractData.conid, contractData.conumber, contractData.custid, contractData.insuranceid,
            contractData.branchid, contractData.startdate, contractData.enddate, contractData.clear,
            contractData.mikta, contractData.promithia, contractData.paymentmethod, contractData.omadiko,
            contractData.pinakida, contractData.ispaid, contractData.paydate, contractData.inform
        ];

        await db.query(insertQuery, values);

        // Delete the contract from delcontracts
        const deleteQuery = `DELETE FROM delcontracts WHERE conid = ?`;
        await db.query(deleteQuery, [conId]);

        return { success: true };
    } catch (error) {
        console.error('Error in restoring contract:', error);
        throw error;
    }
}


module.exports = {  GetAllDeletedContracts,PermaDeleteContract,RestoreContract}
