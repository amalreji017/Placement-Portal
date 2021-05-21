const mongoose = require('mongoose');

const URI = 'mongodb';

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
