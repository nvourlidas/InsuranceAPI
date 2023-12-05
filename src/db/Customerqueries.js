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
      SELECT * FROM customer
    `;
    db.query(selectQuery, callback);
}

function deleteCustomer(name, surname, email, callback) {
    const checkQuery = `
      SELECT * FROM customer
      WHERE name = ? AND surname = ? AND email = ?
    `;

    db.query(checkQuery, [name, surname, email], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return callback(err, null);
        }

        if (result.length === 0) {
            return callback(null, { notFound: true });
        }

        const deleteQuery = `
            DELETE FROM customer
            WHERE name = ? AND surname = ? AND email = ?
        `;
        db.query(deleteQuery, [name, surname, email], callback);
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