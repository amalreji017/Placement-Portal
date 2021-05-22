const { request, response } = require('express');
const facultymodel = require('../models/facultymodel');
const usermodel = require('../models/usermodel');
//const multer = require('multer');

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



