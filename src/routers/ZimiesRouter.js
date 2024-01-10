const express = require('express')
const router = new express.Router()
const cors = require('cors')
const{GetAllZimies,AddZimies,GetZimiaByID,DeleteZimiesById,UpdateZimies} =require('../db/Zimiesqueries')

router.use(cors());

router.get('/zimies', async(req,res)=>{
    try{
        const zimies = await GetAllZimies();
        res.status(200).json(zimies);
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/zimies', async (req, res) => {
    try {
        const zimiesData = req.body; 
        const result = await AddZimies(zimiesData);

        res.status(201).json({
            message: 'Zimies added successfully',
            insertedId: result.insertId 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/zimies/:zid', async (req, res) => {
    const zimid = req.params.zid;

    try {
        const zimiesData = await GetZimiaByID(zimid);
        
        if (!zimiesData || zimiesData.length === 0) {
            return res.status(404).send('Zimies not exist');
        }

        await DeleteZimiesById(zimid);
        res.status(200).send("Zimia successfully deleted");
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
});


router.patch('/zimies/:zid', async (req, res) => {
    const zid = req.params.zid;
    console.log(zid);
    const updates = req.body; // Use const to declare updates
    const check = Object.keys(req.body);

    const allowedProperties = ['insidid', 'custumerid', 'znumber', 'poso', 'status', 'contractid', 'inputdate'];

    const allUpdatesExist = check.every(key => allowedProperties.includes(key));

    if (!allUpdatesExist) return res.status(400).send('Invalid argument');
    
    try{
        const isZimiesExist = await GetZimiaByID(zid);
        if (!isZimiesExist) return res.status(404).send('Zimies not found');
    
        await UpdateZimies(zid,updates)
        res.status(200).send('Zimies updated successfully');

    }catch(e){
        console.error(e);
        res.status(500).send(e.message);
    }

});

module.exports=router