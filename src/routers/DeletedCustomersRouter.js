const express = require('express')
const router = new express.Router()
const {GetDeletedCostomers} =require('../db/DeletedCustomersqueries')

router.get('/deleted_customer',async(req,res) =>{
    try{
        const deleted = await GetDeletedCostomers();
        res.status(200).json(deleted);
    }catch(e){
        res.status(500).send(e)
    }
})





module.exports=router