const { request, response } = require('express');
const facultymodel = require('../models/facultymodel');
const usermodel = require('../models/usermodel');

//faculty login
exports.login = async (request,response)=>{
    var faculty= await facultymodel.findOne({email:request.body.email});
    if(faculty){
        let validPassword = faculty.comparePassword(request.body.password);
        if(validPassword){
              response.json({result: true, faculty: faculty,email:faculty.email})
        }else{
            response.json({result: false,error:'WRONG PASSWORD'})
        }
    }else{
         response.json({result: false, error: 'INVALID USER'})
    }
}
//see details of students above cgpa cutoff 
exports.cgpa_backlog = async (request,response)=>{
    var backlog_no = request.body.backlog;
    var cutoff = request.body.cgpa;
    usermodel
        .find({
            backlog : { $gte: backlog_no },
            cgpa : { $gte: cutoff },
          })
        .sort({ student_name : 1 })
        .select('college_id student_name cgpa email batch department')
        .exec(function(err,doc) {
            if (err) { 
                throw err; 
            } else { 
                 response.json(doc);
            } 
        });
}
//insert faculty
exports.insert = async (request,response) => {
    const email = request.body.email;
    const password= request.body.password;
    const name = request.body.name;
    const number = request.body.number;
    const department= request.body.department;

    const faculty = new facultymodel({
        email,
        password,
        name,
        number,
        department
    });
    faculty.save()
    .then(()=>response.json(' faculty added!!'))
    .catch(err=>response.status(400).json('error: '+err));
} 



