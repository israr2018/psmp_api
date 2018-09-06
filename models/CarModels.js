const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// create car_add schema

const CarModelsSchema = new Schema(
    {
      
        car_make_id:{type: Schema.Types.ObjectId, ref: 'CarMake'},
        car_model_name: {type:String}
      
    }
);
module.exports=mongoose.model('CarModels',CarModelsSchema,"CarModels");