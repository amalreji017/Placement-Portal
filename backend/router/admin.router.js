const express = require('express');
const adminHandler = require('../handlers/admin/admin.handler');
const { protect } = require("../middleware/auth");
const router =  express.Router();



/*router.get('/admin', (req, res) => {
    res.send('Admin Page')
  })
//router.post('/insert',adminHandler.insert);*/
router.post('/login',adminHandler.login);
router.get('/dashboard',protect,adminHandler.getPrivateRoute);




module.exports = router;