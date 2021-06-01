const { request, response } = require('express');
const adminmodel = require('../../models/adminmodel');
const usermodel = require('../../models/usermodel');



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

//insert student
exports.insert = async (request,response) => {
    const email = request.body.email;
    const password= request.body.password;
    const student_name = request.body.student_name;
    const batch = request.body.batch;
    const college_id = request.body.college_id;
    const gender = request.body.gender;
    const department= request.body.department;

    const student = new usermodel({
        email,
        password,
        student_name,
        batch,
        college_id,
        gender,
        department
    });
    student.save()
    .then(()=>response.json(' student added!!'))
    .catch(err=>response.status(400).json('error: '+err));
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
