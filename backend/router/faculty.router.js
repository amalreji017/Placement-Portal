const express = require('express');
const facultyHandler = require('../handlers/faculty.handler');
const router =  express.Router();
const multer = require('multer');

//routes
router.post('/login',facultyHandler.login);
router.post('/cgpa-backlog',facultyHandler.cgpa_backlog);
router.post('/insert',facultyHandler.insert);



module.exports = router;