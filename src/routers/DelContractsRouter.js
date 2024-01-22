const express = require('express');
const router = new express.Router();
const GetDelContrancts = require('../db/DeletedCustomersqueries');

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
router.delete('/delcontracts/:conid', async (req, res) => {
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

router.post('/restore_contract/:conid', async (req, res) => {
    const conId = req.params.conid;

    try {
        const restoreResult = await RestoreContract(conId);

        if (restoreResult.notFound) {
            res.status(404).send({ error: 'Contract not found in delcontracts' });
        } else if (restoreResult.success) {
            res.status(200).send({ success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


module.exports = router;
