const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// create book schema

var bookModel = new Schema(
    {
        Title: {type:String},
        Author:{type:String},
        Price: {type:String},
        Genere: {type:String}
    }
);
module.exports=mongoose.model('Book',bookModel);


