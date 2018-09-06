var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
//var db=mongoose.connect('mongodb://localhost:27017/bookApi');
var db=mongoose.connect('mongodb://localhost:27017/SMS');
//var db=mongoose.connect('mongodb://localhost:27017/MCZ_A2');
/* mongoose.connect('mongodb://localhost:27017/SMS',function(err,db){
if(err){
console.log("err",err);

}
else{

    //console.log('Connected', db);
    console.log("Connection succeded");
}

}); */
var Book=require('./models/bookModel');
var  CarAds=require('./models/CarAds');
var  CarMakes=require('./models/CarMakes');
var  CarModels=require('./models/CarModels');
var  UserModel=require('./models/UserModel');
var school_model=require('./models/school_model');
var class_model=require('./models/class_model');
var student_reg_model=require('./models/student_reg_model');
var student_attendence_model=require('./models/student_attendence_model');
var port=process.env.PORT||3000;
app.use('/uploads',express.static('uploads'));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter=require('./Routes/bookRoutes')(Book);
var carAdsRouter=require('./Routes/CarAdsRoutes')(CarAds);
var carMakesRouter=require('./Routes/CarMakesRoutes')(CarMakes);
var carModelsRouter=require('./Routes/CarModelsRoutes')(CarModels);

var authRouter=require('./Routes/authRoute')(UserModel);
var school_router=require('./Routes/school_route')(school_model);
var class_router=require('./Routes/class_route')(class_model);
var student_router=require('./Routes/student_route')(student_reg_model);
var attendence_router=require('./Routes/attendence_route')(student_attendence_model);
app.use("/api/Books",bookRouter);
app.use("/api/CarAds",carAdsRouter);
app.use("/api/CarMakes",carMakesRouter);
app.use("/api/CarModels",carModelsRouter);
app.use("/api/authenticate",authRouter);
app.use("/api/schools",school_router);
app.use("/api/classes",class_router);
app.use("/api/students",student_router);
app.use("/api/attendence",attendence_router);
app.get('/',function(req,res) {
    res.send("Welcome to the node REST full web services ");
});
app.listen(port,function () {
    console.log("Gulp is Running on PORT"+port)
});