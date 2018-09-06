const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mark_att={
"status":"",
"day":""
};
var mark_arr={
    "mark":[mark_att]
   };
var attend={
year:Number,
attendence_register:[mark_arr]
};

const StudentRegSchema = new Schema({
    // car_model_id:,
    class_level:
        {type: String},
    school_id:
    {type: Schema.Types.ObjectId, ref: 'schools'},
    student_name: {
        type: String
    },
    father_name: {
        type: String
    },
    gardian_name: {
        type: String
    },
    student_mobile: {
        type: String
    },
    gardian_mobile: {
        type: String
    },
    father_mobile: {
        type: String
    },
    post_address:{
        type:String
    },
    dob:{
        type:Date
    },
    session_start:{
        type:Number
    },
    session_end:{
        type:Number
    },
    
    attendence: mongoose.Schema.Types.Mixed
       
}
);
module.exports = mongoose.model('StudentReg', StudentRegSchema, 'students');