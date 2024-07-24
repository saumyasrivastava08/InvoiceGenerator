// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:InvoiceGen@invoicegen.yk5e0du.mongodb.net/invoice-generator?retryWrites=true&w=majority&appName=InvoiceGen";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   connectTimeoutMS: 30000,
//   socketTimeoutMS: 30000
// });

// async function connectDB() {
//   try {
//     console.log("Connecting to MongoDB...");
//     await client.connect();
//     console.log("Connected to MongoDB");
    
//     const db = client.db("invoice-generator");

//     // Check if the collection exists
//     const collections = await db.listCollections({ name: "users" }).toArray();
//     if (collections.length > 0) {
//       console.log("The 'users' collection exists.");
//     } else {
//       console.log("The 'users' collection does not exist.");
//     }

//     return db;
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//     throw err;
//   }
// }



// module.exports = connectDB;


const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:InvoiceGen@invoicegen.yk5e0du.mongodb.net/invoice-generator?retryWrites=true&w=majority&appName=InvoiceGen";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000
});

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB with Mongoose");

    // Check if the collection exists using MongoClient
    await client.connect();
    const db = client.db("invoice-generator");

    const collections = await db.listCollections({ name: "users" }).toArray();
    if (collections.length > 0) {
      console.log("The 'users' collection exists.");
    } else {
      console.log("The 'users' collection does not exist.");
    }

    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = connectDB;
