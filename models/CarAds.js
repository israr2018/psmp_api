const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// car make schema

// create car_add schema
const CarAdsSchema = new Schema({
    // car_model_id:{ },
    is_active: {
        type: Boolean,
        default:false
    },
    car_price: {
        type: String
    },
    contact_number: {
        type: String
    },
    varification_code:{

        type:Number,
        
    },
    is_mobile_varified:{

        type:Boolean,
        default:false
        
    },
    car_model_year: {
        type: String
    },
    car_transmission_type: {
        type: String
    },
    car_engine_type: {
        type: String
    },
    car_engine_capacity: {
        type: String
    },

    car_km_driven: {
        type: String
    },

    car_image: [],
    car_description: {
        type: String
    },
    car_make: {
        make_id: {
            type: String
        },
        make_name: {
            type: String
        },
        model_name: {
            type: String
        },
        model_id: {
            type: String
        }

    }

});

module.exports = mongoose.model('CarAds', CarAdsSchema, 'CarAds');