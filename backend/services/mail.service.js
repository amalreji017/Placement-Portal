const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const from = '"Placement Portal" <mitsplacementportal@gmail.com>';
const baseUrl = 'http://localhost:4000/app';


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


async function sendMail(user) {

    try {
        console.log(process.env.EMAIL)
        const opts ={
                from: from,
                to: user.email,
                subject: 'Reset Password Request : Placement Cell,MITS Varikoli',
                text: 'Hello '+ user.student_name + 'You requested for the reset password.Please find the below link Reset password With Regards,Placement Cell,MITS',
                html: 'Hello <strong>'+ user.student_name + '</strong>,<br><br>You requested for the reset password. Please find the below link<br><br><a href="' + baseUrl + "/forgotPassword/" + user.temporarytoken + '">Reset password</a>'
            }
        console.log(opts);
        const data = await transporter.sendMail(opts,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log('Email sent' + info.response);
            }
        });
        console.log(opts);

        return { success : true, message : 'Email sent.', data : data }

    }
    catch (err) {
        return { success : false, message : 'Email service not working.' , error : err}
    }
}

exports.sendMail = sendMail;
