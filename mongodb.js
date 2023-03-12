require("dotenv").config();
const {MongoClient} = require('mongodb');
const url= process.env.MONGODB_URI;
const databaseName=process.env.MONGODB_DBNAME;
const client= new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection(process.env.MONGODB_COLLECTION);
  
}
module.exports= dbConnect;