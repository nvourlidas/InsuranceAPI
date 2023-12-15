const db = require('./db')

function getAllFiles() {
    const selectQuery = 'SELECT id,filename,cuid,coid,zimid FROM test';
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


function uploadFileToDatabase(filename, fileBuffer, cuid, coid, zimid) {
    const insertQuery = 'INSERT INTO test (filename, data, cuid, coid, zimid) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(insertQuery, [filename, fileBuffer, cuid, coid, zimid], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }


function getCustomerNameAndSurnameForTest() {
  const joinQuery = `
    SELECT customer.name, customer.surname
    FROM test
    JOIN customer ON test.cuid = customer.cid;
  `;

  return new Promise((resolve, reject) => {
    db.query(joinQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getFileByIdAsync(fileId) {
  const query = 'SELECT filename, data FROM test WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [fileId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}




module.exports = {
    getAllFiles,
    uploadFileToDatabase,
    getFileByIdAsync,
    getCustomerNameAndSurnameForTest
};