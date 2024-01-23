const express = require('express')
const router = new express.Router()
const {getAllOmadika, DeleteOmadika, AddOmadiko} = require('../db/omadikaQueiries')

//GET OMADIKA
router.get('/omadika/:id', async(req,res) =>{
    const id = req.params.id
    try{
        const omadika = await getAllOmadika(id);
        res.status(200).json(omadika);
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/omadika',async (req,res) => {
    const id = req.body.id
    try{
      const omadikadel = await DeleteOmadika(id)
      res.status(200).send(omadikadel)
  
    }catch(e){
      console.log(e)
      res.status(500).send(e)
    }
  })


  router.post('/omadika', async (req, res) => {
    const omadikaData = req.body;

    try {
        const newBranchId = await AddOmadiko(omadikaData);
        res.status(201).send({ id: newBranchId }); // 201 status for successful creation
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }
});


module.exports=router