const express = require('express');
const connectDB = require('./db/connection');
const app = express();
const routerUrls = require('./router/router');
const cors = require('cors');

const Port = 4000;
  
connectDB();

app.use(express.json())
app.use(cors());
app.use('/app',routerUrls)
app.listen(Port,()=>console.log('server connected')); 