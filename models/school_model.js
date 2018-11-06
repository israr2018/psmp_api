const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchoolsSchema = new Schema({
    // car_model_id:{type: Schema.Types.ObjectId, ref: 'CarModels'},
    school_name:{
        type:String
    },
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_password:{

        type:String
        
    },
    user_mobile:{

        type:String
       
    },
    user_email:{
        type:String
    },
    user_role:{
        type:String,
        default:"school_admin"
    },
    is_activated: {
        type: Boolean,
        default:true
    }
}

);

module.exports = mongoose.model('School', SchoolsSchema);