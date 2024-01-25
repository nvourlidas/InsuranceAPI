const express = require('express')
const router = new express.Router()
const {getAllCBranches,DeleteBranches,AddBranch} = require('../db/Branchesqueries')

router.get('/branches', async(req,res) =>{
    try{
        const contracts = await getAllCBranches();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/branches/:bid', async (req, res) => {
    const branchID = req.params.bid;

    try {
        await DeleteBranches(branchID);
        res.status(204).send(); // 204 status for successful deletion
    } catch (e) {
        console.log(e);
        if (e === "Branch not found") {
            res.status(404).send({ error: e });
        } else {
            res.status(500).send({ error: e });
        }
    }
});

router.post('/branches', async (req, res) => {
    const branchData = req.body;

    try {
        const newBranchId = await AddBranch(branchData);
        res.status(201).send(newBranchId); // 201 status for successful creation
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }
});

module.exports=router