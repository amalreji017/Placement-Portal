const tokenize = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
let key = process.env.key;

exports.encode = (data) => {
    return tokenize.sign({student_name:data.student_name,college_id:data.college_id},secret,{ expiresIn: '1h' })
};

