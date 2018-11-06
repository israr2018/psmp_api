const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var january={
    "january":"january",
    "monthly_fee":"1000",
    "admission_fee" :"2000",
    "transport_fee":"500",
    "debit":0,
    "credit":0,
    "discount":0
 };
 var febuary= {
    "febuary":"febuary",
    "monthly_fee":"1000",
    "admission_fee" :"3000",
    "transport_fee":"500",
    "debit":0,
    "credit":0,
    "discount":0
 };
// var january=new Schema({
//     "january":{type:String,default:"january"},
//     "monthly_fee":{type:Number,default:0},
//     "admission_fee" :{type:Number,default:0},
//     "transport_fee":{type:Number,default:0},
//     "debit":{type:Number,default:0},
//     "credit":{type:Number,default:0},
//     "discount":{type:Number,default:0}
//  });
//  var febuary= new Schema({
//     "febuary":{type:String,default:"febuary"},
//     "monthly_fee":{type:Number,default:0},
//     "admission_fee" :{type:Number,default:0},
//     "transport_fee":{type:Number,default:0},
//     "debit":{type:Number,default:0},
//     "credit":{type:Number,default:0},
//     "discount":{type:Number,default:0}
//  });
 
 var month_wise_record=[];
 month_wise_record.push(january);
 month_wise_record.push(febuary);

const FeesLedgerSchema=new Schema({
        
        student_id:
        {type:Schema.Types.ObjectId,ref:'students'},
       
        fees:{
        year:{type:Number,default:2018},
        months:[]
        }
});
module.exports=mongoose.model("FeesLedger",FeesLedgerSchema,'fees_ledger');