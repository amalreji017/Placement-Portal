const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URI = process.env.DB_CONNECT;

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
