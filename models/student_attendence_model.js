const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const AttendenceSchema=new Schema({
    "student_id":{type: Schema.Types.ObjectId, ref: 'students'},
    "date":{type:String},
    "status":{type:String}
});
module.exports = mongoose.model('Attendence', AttendenceSchema, 'student_attendence');