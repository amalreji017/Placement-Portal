const { request, response } = require('express');
const adminmodel = require('../models/adminmodel');

//Admin Login
exports.login = async (request,response)=>{
    var user= await adminmodel.findOne({email:request.body.email});
    if(user){
        let validPassword = user.comparePassword(request.body.password);
        if(validPassword){
              response.json({result: true, user: user,email:user.email})
        }else{
            response.json({result: false,error:'WRONG PASSWORD'})
        }
    }else{
         response.json({result: false, error: 'INVALID USER'})
    }
}


/*exports.insert = async (request,response) => {
         const email = request.body.email;
         const password= request.body.password;
         const name = request.body.name;
         
    
         const admin = new adminmodel({
             email,
             password,
             name
           
         });
         admin.save()
         .then(()=>response.json(' Admin added!!'))
         .catch(err=>response.status(400).json('error: '+err));
     }*/