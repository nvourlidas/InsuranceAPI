const express = require('express')
const router = new express.Router()
const {getAllCovers} = require('../db/Coversqueries')
const db = require('../db/db')


router.get('/contracts', async(req,res) =>{
    try{
        const contracts = await getAllCovers();
        res.status(200).json(contracts);
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router