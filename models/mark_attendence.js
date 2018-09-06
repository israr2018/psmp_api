import { Schema } from 'mongoose';

const mongoose=require('mongoose');
const schema=mongoose.schema;
const MonthlySchema=new Schema({
"month_name":{type:string},
"mark":[]
});