const express = require('express')
const router = new express.Router()
const {getAllCBranches} = require('../db/Branchesqueries')

router.get('/branches', async(req,res) =>{
    try{
        const contracts = await getAllCBranches();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports=router