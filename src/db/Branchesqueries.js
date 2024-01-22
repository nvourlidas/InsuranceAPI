const db = require('./db')

function findBranchById(branchID) {
    const sql = `SELECT * FROM branches WHERE bid = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, [branchID], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); // Assuming bid is unique, so only one result is expected
            }
        });
    });
}


function getAllCBranches() {
    const selectQuery = 'SELECT * FROM  branches ';
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

function DeleteBranches(branchID) {
    const sql = `DELETE FROM branches WHERE bid = ?`;

    return new Promise(async (resolve, reject) => {
        try {
            const branch = await findBranchById(branchID);

            if (!branch) {
                reject("Branch not found");
                return;
            }

            db.query(sql, [branchID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

//TESTTTTTTTTT
function AddBranch(branchData) {
    const { bname } = branchData;
    const sql = `INSERT INTO branches (bname) VALUES (?)`;

    return new Promise((resolve, reject) => {
        db.query(sql, [bname], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); 
            }
        });
    });
}

module.exports = {
    getAllCBranches,
    DeleteBranches,
    findBranchById,
    AddBranch
};