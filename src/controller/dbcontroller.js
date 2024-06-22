let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
//let mongoUrl = "mongodb://127.0.0.1:27017";
let mongoUrl = "mongodb+srv://rewatiramansahu:test1234@cluster0.ybz51jq.mongodb.net/?retryWrites=true&w=majority";
let db ; 

function dbConnect()
{
    MongoClient.connect(mongoUrl,{useNewUrlParser:true}, (err, client)=>{
        if(err)  console.log(`Error While connecting to MongoDB: ${err}`);
        db = client.db('node_aug');

    })
}

// make async and await cause of make it asyncronous call
async function getData(collection_name, query)
{
  return await db.collection(collection_name).find(query).toArray();
}




module.exports = {
    dbConnect,
    getData
}