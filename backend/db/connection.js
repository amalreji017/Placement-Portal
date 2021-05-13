const mongoose = require('mongoose');

const URI = 'mongodb+srv://admin:adminmits@cluster0.jcaiy.mongodb.net/user?retryWrites=true&w=majority';

const connectDB = async()=> {
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true 

        });
        console.log('connected to database');
    }catch(err){
    console.log(err);
    }
}
module.exports = connectDB;