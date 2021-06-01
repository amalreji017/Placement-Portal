const express = require('express');
const adminHandler = require('../handlers/admin/admin.handler');
const facultyHandler=require('../handlers/faculty.handler');
const userHandler=require('../handlers/user.handler');
const { protect } = require("../middleware/auth");
const router =  express.Router();



/*router.get('/admin', (req, res) => {
    res.send('Admin Page')
  })
//router.post('/insert',adminHandler.insert);*/
router.post('/login',adminHandler.login);
router.get('/dashboard',protect,adminHandler.getPrivateRoute);
router.post('/insert-faculty',protect,facultyHandler.insert);
router.post('/insert-student',protect,adminHandler.insert);



module.exports = router;