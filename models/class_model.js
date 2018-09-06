const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
    // car_model_id:,
    class_level:{
        type:String
    },
    Fees: {
        type: String
    },
    courses: [],
    school_id:
        {type: Schema.Types.ObjectId, ref: 'schools'}
        
    }

);

module.exports = mongoose.model('Class', ClassSchema,'classes');