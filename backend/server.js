const express = require('express');
const connectDB = require('./db/connection');
const app = express();
const cors = require('cors');

const Port = 4000;
  
connectDB();

//middleware
app.use(express.json())
app.use(cors());

//router
app.use('/app/student',require('./router/user.router'));


app.listen(Port,()=>console.log('server connected')); 