const express = require('express')
const db = require('../db/db')
const router = new express.Router()
const {getAllFiles,uploadFileToDatabase,getFileByIdAsync,getCustomerNameAndSurnameForTest} = require('../db/Filesqueries')
const multer = require('multer')


// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



router.get('/files',async(req,res)=>{
    try{
        const files = await getAllFiles()
        res.status(200).json(files);
    }catch(e){
        res.status(500).send(e)
    }
})


router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file; // Uploaded file details
  const {cuid, coid, zimid } = req.body;

  console.log(req.body)

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    await uploadFileToDatabase(file.originalname, file.buffer,cuid,coid,zimid);
    console.log('File uploaded and saved to database.');
    res.status(200).send('File uploaded and saved to database.');
  } catch (error) {
    console.error('Error inserting file into database:', error);
    res.status(500).send('Error inserting file into database.');
  }
});


// Express route for downloading a file
router.get('/download/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const fileResults = await getFileByIdAsync(fileId);


    if (fileResults.length === 0) {
      return res.status(404).send('File not found.');
    }

    const file = fileResults[0];
    const filename = file.filename;
    const fileData = file.data;

    // Set the appropriate headers for file download
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', 'application/octet-stream');

    // Send the file data as the response
    res.send(fileData);
  } catch (error) {
    console.error('Error retrieving or processing file:', error);
    res.status(500).send('Error retrieving or processing file.');
  }
});



module.exports=router