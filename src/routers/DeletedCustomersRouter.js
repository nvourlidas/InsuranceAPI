const express = require('express')
const router = new express.Router()
const {GetDeletedCostomers,GetDeletedCustomerById,PermaDelete,DeleteDeletedCustomer} =require('../db/DeletedCustomersqueries')

router.get('/deleted_customer',async(req,res) =>{
    try{
        const deleted = await GetDeletedCostomers();
        res.status(200).json(deleted);
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/perma-delete/:id', async (req, res) => {
    try {
        const userIdToDelete = req.params.id;

        // Call the GetDeletedCustomerById function
        const customer = await GetDeletedCustomerById(userIdToDelete);

        // Check if the customer exists
        if (!customer) {
            return res.status(400).send('Invalid user ID');
        }

        // Call the PermaDelete function
        const result = await PermaDelete(parseInt(userIdToDelete));

        // Send a success response
        res.status(200).send(result);
    } catch (e) {
        // Handle errors and send a 500 status code
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/deletedcustomer', async (req, res) => {

    const CustomerId = req.body.id;
    console.log(CustomerId)

    try {
        const result = await DeleteDeletedCustomer(CustomerId);
  
        if (result.notFound) {
            res.status(404).send('Customer not found');
        } else {
            res.status(200).send('User is deleted');
        }
    } catch (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).send('Internal Server Error');
    }
    
});



module.exports=router