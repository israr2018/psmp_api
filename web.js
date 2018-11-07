
var express=require('express');
var app=express();
const config = require('./config/index');
const logger = require('morgan');
var port=process.env.PORT
app.get('/',function(req,res){
 res.send("Hello Israr");
});
app.listen(config.port,function(){
   // console.log("Gulp 2 is Running on PORT"+port);
    console.log("config.."+config.port);
});