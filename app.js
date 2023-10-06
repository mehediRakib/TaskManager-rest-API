//import basic lib package
const express=require('express');
const app=new express();



//import database package
const mongoose=require('mongoose');

//import security middleware
const helmet=require('helmet');
const hpp=require('hpp');
const expressRateLimit=require('express-rate-limit');
const expressMongoSanitize=require('express-mongo-sanitize');
const cors=require('cors');

//import body parser
const bodyParser=require('body-parser');
app.use(bodyParser());



//use security middleware
app.use(helmet());
app.use(expressMongoSanitize());
app.use(cors());
app.use(hpp());


//request rate limit

const limiter=expressRateLimit(
    {
        windowMs:15*60*1000,
        max:3000
    }
)
app.use(limiter);



//database connection
const URI="mongodb://127.0.0.1:27017/TaskManager";
const option={user:'', pass:''};
mongoose.connect(URI,option)
    .then(()=>{
        console.log("Connection created successfully");
    })
    .catch((e)=>{
        console.log("error:",e);
    })
//Router import
const router=require('./src/Routes/api')

//!_______Routing Implement___________//
app.use('/api/v1',router);

//!____________Undefined Routing_____________//
app.use('*',(req,res)=>{
    res.status(404).json({
        status:"fail",
        data:"not Found",
    })
})

module.exports=app;