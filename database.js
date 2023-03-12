require("dotenv").config();
const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
    name:String,
    // price:Number,
    // brand:String,
    // category:String
},{ versionKey: false });

module.exports= mongoose.model(process.env.MONGODB_COLLECTION, productSchema);