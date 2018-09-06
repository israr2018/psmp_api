const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var CarEnginesTypeSchema = new Schema(
    {
     
        car_engine_type:{type:String}
    }
);
module.exports=mongoose.model('CarEngineTypes',CarEngineTypesSchema);