const tokenize = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
let key = process.env.KEY;

exports.encode = (data) => {
    return tokenize.sign({student_name:data.student_name,college_id:data.college_id},key,{ expiresIn: '1h' })
};

