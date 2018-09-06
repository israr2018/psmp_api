const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var CarMakesSchema = new Schema(
    {
        _id:{type: Schema.Types.ObjectId},
        car_make:{type:String}
    }
);
module.exports=mongoose.model('CarMakes',CarMakesSchema,'CarMakes');