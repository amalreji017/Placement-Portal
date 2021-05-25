const express = require('express');
const userHandler = require('../handlers/user.handler');
const router =  express.Router();
const multer = require('multer');

const  fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../frontend/resume/'+req.body.department+'/'+req.body.batch);
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.college_id+'.pdf');
    },
});
const upload = multer({ storage : fileStorageEngine });

router.post('/login',userHandler.login);
router.post('/cgpa',userHandler.cgpa);
router.post('/forgotpassword',userHandler.forgotPassword);

router.post('/resume',upload.single(''),(req,res)=>{
    console.log(req.file);
    res.send('resume uploaded');
});
//router.post('/insert',userHandler.insert);
module.exports = router;