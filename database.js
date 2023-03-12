require("dotenv").config();
const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
    _id:String,
    shoeName:String,
    colorway:Object,
    size:Object,
    brand:String
},{ versionKey: false });

module.exports= mongoose.model(process.env.MONGODB_COLLECTION, productSchema);