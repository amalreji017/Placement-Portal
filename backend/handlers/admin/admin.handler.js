const { request, response } = require('express');
const adminmodel = require('../../models/adminmodel');



//Admin Login
exports.login = async (req,res)=>{
    const user= await adminmodel.findOne({email:req.body.email}).select("+password");
    if(user){
        let validPassword = user.comparePassword(req.body.password);
        if(validPassword){
              sendToken(user,res);
        }else{
            res.json({result: false,error:'WRONG PASSWORD'})
        }
    }else{
         res.json({result: false, error: 'INVALID USER'})
    }
    
}


//admin dashboard 
exports.getPrivateRoute = (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        data: "You got access to the Dashboard in this route",
      });
  };



const sendToken=(user,res)=>{
    const token=user.getSignedToken();
    res.json({
        success:true,
        token
    })
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
