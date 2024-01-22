const db = require('./db')


function DeleteInsurance(inID){
    const sql = `DELETE  FROM insurances WHERE inid = ? `
    return new Promise((resolve,reject) =>{
        db.query(sql,[inID],(err,results) => {
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

function PostInsurances(insuranceData) {
    const { inid, iname } = insuranceData;
    const sql = `INSERT INTO insurances (inid, iname) VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(sql, [inid, iname], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}



module.exports = {DeleteInsurance,PostInsurances}