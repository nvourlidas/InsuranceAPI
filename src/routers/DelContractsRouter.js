const express = require('express');
const router = new express.Router();
const GetDelContrancts = require('../db/DelContractsqueries');

router.get('/delcontracts', async (req, res) => {
    try {
        const delContracts = await GetDelContrancts();
        return res.status(200).json(delContracts);
    } catch (e) {
        console.error(e);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
