const mongoose = require('mongoose');

const faculty = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
})

faculty.pre('save', function (next) {

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

//userSchema.plugin(titlize, {
    // addition here also
//    paths: ['address','city','state','country' ], // Array of paths
//});

// Password compare method
faculty.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Faculty',faculty);
