const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);




const adminmodel = new mongoose.Schema({
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
    }
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

module.exports = mongoose.model('admin',adminmodel);
