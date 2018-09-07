var express=require('express');
var app=express();
var port=process.env.PORT || 3000
app.get('/',function(req,res){
 res.send("Hello Israr");
});
app.listen(port,function(){
    console.log("Gulp 2 is Running on PORT"+port)
});