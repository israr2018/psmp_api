const config = require('./config/index');
var express=require('express');
var app=express();
var cors=require('cors');
app.use(cors({credentials: true, origin: true}));
//const config = require('./config');
//require('dotenv').config();

const logger = require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var db=mongoose.connect(config.database.connection).then(()=>{
console.log("connect to the data base successfully.")
},(error)=>{
//console.log(`Could not connect to database something goes wrong:${error}`);
});

var school_model=require('./models/school_model');
var class_model=require('./models/class_model');
var student_reg_model=require('./models/student_reg_model');
var student_attendence_model=require('./models/student_attendence_model');
var fees_ledger_model=require('./models/fees_ledger');

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//var authRouter=require('./Routes/authRoute')(UserModel); 
var school_router=require('./Routes/school_route')(school_model);
var class_router=require('./Routes/class_route')(class_model);
var student_router=require('./Routes/student_route')(student_reg_model);
var attendence_router=require('./Routes/attendence_route')(student_attendence_model);

app.use("/api/schools",school_router);
app.use("/api/classes",class_router);
app.use("/api/students",student_router);
app.use("/api/attendence",attendence_router);

app.get('/',function(req,res) {
    res.send("Welcome PSMS  api services... ");
});
app.listen(config,function () {
   console.log("server is running on port: "+ config.port);
   
});