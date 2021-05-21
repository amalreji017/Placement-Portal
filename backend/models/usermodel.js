const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const usermodel = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    student_name : {
        type : String,
        required:true
    },
    college_id : {
        type : String,
        unique : true
    },
    passout_batch : {
        type : String
    },
    program : {
        type : String,
    },
    gender : {
        type : String,
        default : 'F'
    },
    status : {
        type : String,
    },
    contact_no : {
        type : String,
    },
    college_email : {
        type : String,
    },
    department : {
        type : String,
        required:true
    },
    cgpa : {
        type : String,
    },
    matric_marks : {
        type : String
    },
    matric_board : {
        type : String
    },
    senior_marks : {
        type : String
    },
    senior_board : {
        type : String
    },
    alternate_contact_no : {
        type : String
    },
    address : {
        type : String
    },
    city : {
        type : String
    },
    post_code : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    linkedln_link : {
        type : String
    },
    login_otp : {
        type : String
    },
    resume_url : {
        type : String
    },
    active : {
        type : Boolean,
        default : true
    },
    temporarytoken : {
        type : String,
    },
    permission : {
        type : String,
        required : true,
        default: 'student'
    }

});
usermodel.pre('save', function (next) {

    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        // Store hash in your password DB.
        if(err) {
            return next(err);
            //res.send('Error in hashing password');
        } else {
            user.password = hash;
            next();
        }
    });
});

usermodel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user',usermodel);