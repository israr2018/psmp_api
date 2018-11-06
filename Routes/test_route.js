//dependencies 
var pdf=require('pdfkit');
var fs=require('fs');
const express=require('express');
const mongoose=require('mongoose');

const month=require('../models/monthly_ledger');
var route=function(FeesLegder){
var test_router=express.Router();
test_router.get("/",function(req,res){
     const ledger=new FeesLegder();
     ledger.student_id="5b9a4962c75f6914ec151044";
     
     ledger.fees.months.push(month);
     FeesLegder.create(ledger,function(err,result){
        if(!err){
            console.log("!err");
            return res.status(201).json(result);
        }
        else{
             return res.status(500).json({
                "message":"Internal Server Error"
            });
        }
});

});
test_router.post('/test',function(req,res){
console.log("test/test");
var myDoc=new pdf;
myDoc.pipe(fs.createWriteStream('./uploads/file1.pdf'));
// myDoc.fontSize(22);
// myDoc.text(req.body.school_name,{
//     align:'center'
// });
// myDoc.moveDown();
myDoc.fontSize(22);
myDoc.text(req.body.school_name,{align:'center'});
myDoc.moveDown('0.5');
myDoc.fontSize(12);
myDoc.text(req.body.exam_type+":"+req.body.session,{align:'center'});
myDoc.moveDown();
myDoc.fontSize(12);
myDoc.text("Subject:"+req.body.subject,{align:'center'});
myDoc.moveDown();
myDoc.fontSize(12);
myDoc.text("Class:"+req.body.class,{align:'center'});
myDoc.moveDown();
myDoc.fontSize(12);
myDoc.text("Group:"+req.body.group,{align:'center'});
myDoc.moveDown(); 
myDoc.fontSize(10);
myDoc.text("Time:3:30 hours",{align:'left'});
myDoc.text("Total Marks:100",{align:'right'});

myDoc.underline(30,230,530,30);

myDoc.end();
return res.status(200).json({"success":"ok"});
});
return test_router;
}
module.exports=route;