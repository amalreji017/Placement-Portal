const { request, response } = require('express');
const usermodel = require('../models/usermodel');
const mail  =require('../services/mail.service');
const jwtService = require('../services/token.service');
//const multer = require('multer');

exports.login = async (request,response)=>{
    var user= await usermodel.findOne({email:request.body.email});
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

//updatecgpa
exports.cgpa = async(request,response) => {
    var new_cgpa = request.body.cgpa;
    var email_id = request.body.email;
    usermodel.findOneAndUpdate({email:email_id},{$set:{cgpa : new_cgpa}},{new:true}, function(err,doc) {
         if (err) { 
             throw err; 
         } else { 
              response.json(doc);
         } 
    });

}

//forgot password
exports.forgotPassword = async (request, response) => {
    const email = request.body.email;

    if(!email)
        response.status(200).json({ success : false, message : 'Missing Email ID'});
    else{
        try {
            const user = await usermodel.findOne({ email : request.body.email }).select('college_id email temporarytoken student_name')

            if(!user) {
                response.status(200).json({ success : false, message : 'Email ID not found.'})
            } else {
                user.temporarytoken = jwtService.encode(user);
                //console.log(user.temporarytoken);
                let updateToken = await usermodel.updateOne({ email : request.body.email }, { temporarytoken : user.temporarytoken })
                const sendLink = await mail.sendMail(user);
                response.status(200).json({ success : true, message : 'Link to reset your password has been sent to your registered email'});
            }
        }
        catch (err) {
            console.error(err);
            response.status(200).json({ success : false, message : 'Something went wrong!' })
        }
    }
}

//insert
 /*exports.insert = async (request,response) => {
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
 } */
//resume upload
// const  fileStorageEngine = multer.diskStorage({
//     destination:(request,file,cb)=>{
//         cb(null,'../resume/'+request.body.department+'/'+request.body.batch);
//     },
//     filename:(request,file,cb)=>{
//         cb(null,request.body.college_id+'.pdf');
//     },
// });
// const upload = multer({ storage : fileStorageEngine });

// exports.resume = (upload.single(),(request,response)=>{
//     console.log(request.file);
//     response.send('resume uploaded');
// });

