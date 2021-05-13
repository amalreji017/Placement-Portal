const { request, response } = require('express');
const express = require('express');
const usermodel = require('../models/usermodel');
const router =  express.Router();

router.post('/login',async (request,response)=>{
   var user= await usermodel.findOne({email:request.body.email});
   if(user){
       if(user.password == request.body.password){
             response.json({result: true, user: user})
       }else{
           response.json({result: false,error:'wrong password'})  
       }
   }else{
        response.json({result: false, error: 'user not found'})
   }
})

module.exports = router;