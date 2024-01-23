const express = require('express');
const router = new express.Router();
const { GetAllDeletedContracts, DeleteDeletedCustomer, PermaDeleteContract } = require('../db/DelContractsqueries');

router.get('/deleted_contracts', async (req, res) => {
    try {
        const deletedContracts = await GetAllDeletedContracts();
        res.status(200).send(deletedContracts);
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }
});

// Router for permanently deleting a contract from delcontracts
router.delete('/permadelcontracts/:conid', async (req, res) => {
    const conId = req.params.conid;

    try {
        const result = await PermaDeleteContract(conId);

        if (result.notFound) {
            res.status(404).send({ error: 'Contract not found in delcontracts' });
        } else {
            res.status(200).send({ success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.delete('/deletedelcontracts',async(req,res)=>{
    const delcontractID = req.body.id;
    console.log(delcontractID)

    try{
        const result = await DeleteDeletedCustomer(delcontractID)
        if (result.notFound) {
            res.status(404).send('Customer not found');
        } else {
            res.status(200).send('User is deleted');
        }
    }catch(e){
        console.error('Error executing MySQL query:', error);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;
