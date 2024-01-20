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

function GetDeletedCustomerById(id) {
    const query = `SELECT * FROM delcustomer WHERE cid = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); 
            }
        });
    });
}

function PermaDelete(id) {
    const query = `DELETE FROM delcustomer WHERE cid = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(`User with ID ${id} has been permanently deleted.`);
            }
        });
    });
}

function DeleteDeletedCustomer(CustomerId) {
    return new Promise((resolve, reject) => {
        const checkQuery = `
            SELECT * FROM delcustomer
            WHERE cid = ?
        `;

        db.query(checkQuery, [CustomerId], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                reject(err);
            }

            if (result.length === 0) {
                resolve({ notFound: true });
            }

            // Move customer to delcustomer table
            const moveQuery = `
                INSERT INTO customer (cid, name, surname, email, cellphone, phone, gender, postcode, property, birthday, afm)
                SELECT cid, name, surname, email, cellphone, phone, gender, postcode, property, birthday, afm
                FROM delcustomer
                WHERE cid = ?
            `;
            
            // Parameters for the moveQuery
            const moveParams = [CustomerId];

            db.query(moveQuery, moveParams, (err, moveResult) => {
                if (err) {
                    console.error('Error moving customer to delcustomer table:', err);
                    reject(err);
                }

                // Delete customer from customer table
                const deleteQuery = `
                    DELETE FROM delcustomer
                    WHERE cid = ?
                `;

                // Parameters for the deleteQuery
                const deleteParams = [CustomerId];

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
    GetDeletedCostomers,
    GetDeletedCustomerById,
    PermaDelete,
    DeleteDeletedCustomer
}