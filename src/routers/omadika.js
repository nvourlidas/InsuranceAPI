const express = require('express')
const router = new express.Router()
const {getAllOmadika} = require('../db/omadikaQueiries')

//GET OMADIKA
router.get('/omadika', async(req,res) =>{
    try{
        const contracts = await getAllOmadika();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router