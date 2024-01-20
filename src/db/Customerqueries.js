const db = require('./db')

function insertCustomer(data, callback) {
    const insertQuery = `
      INSERT INTO customer (name, surname, email, cellphone, phone, gender, postcode, property, birthday,afm)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
    db.query(insertQuery, [...Object.values(data)], callback);
}

function getCustomers(callback) {
    const selectQuery = `
      SELECT *,DATE_FORMAT(birthday, '%d-%m-%Y') AS birthday FROM customer ORDER BY surname ASC
    `;
    db.query(selectQuery, callback);
}

function deleteCustomer(CustomerId) {
    return new Promise((resolve, reject) => {
        const checkQuery = `
            SELECT * FROM customer
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
                INSERT INTO delcustomer (cid, name, surname, email, cellphone, phone, gender, postcode, property, birthday, afm)
                SELECT cid, name, surname, email, cellphone, phone, gender, postcode, property, birthday, afm
                FROM customer
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
                    DELETE FROM customer
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


function getCustomerById(customerId) {
    const selectQuery = 'SELECT * FROM customer WHERE cid = ?';
    return new Promise((resolve, reject) => {
        db.query(selectQuery, [customerId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function updateCustomer(customerId, updates) {
    const updateQuery = 'UPDATE customer SET ? WHERE cid = ?';
    return new Promise((resolve, reject) => {
        db.query(updateQuery, [updates, customerId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports= {insertCustomer, getCustomers,deleteCustomer,getCustomerById,updateCustomer}