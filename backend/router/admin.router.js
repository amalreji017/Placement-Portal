const express = require('express');
const adminHandler = require('../handlers/admin.handler');
const router =  express.Router();



//router.post('/insert',adminHandler.insert);
router.post('/login',adminHandler.login);


module.exports = router;