const express = require('express');
const facultyHandler = require('../handlers/faculty.handler');
const router =  express.Router();
const multer = require('multer');

//router.post('/insert',userHandler.insert);
router.post('/cgpa-backlog',facultyHandler.cgpa_backlog);

//router.post('/resume',upload.single(''),(req,res)=>{
//  console.log(req.file);
//  res.send('resume uploaded');
//});

module.exports = router;