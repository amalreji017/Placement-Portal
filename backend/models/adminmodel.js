const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const jwt=require('jsonwebtoken');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);




const adminmodel = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ]
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false


    },
    name:{
        type:String,
        required:true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

adminmodel.pre('save', function (next) {

    var admin = this;

    if(!admin.isModified('password')) return next();

    bcrypt.hash(admin.password, null, null, function(err, hash) {
        // Store hash in your password DB.
        if(err) {
            return next(err);
            //res.send('Error in hashing password');
        } else {
            admin.password = hash;
            next();
        }
    });
});

adminmodel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

adminmodel.methods.getSignedToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
module.exports = mongoose.model('admin',adminmodel);
