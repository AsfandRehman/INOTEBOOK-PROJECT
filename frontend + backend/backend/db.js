const mongoose = require('mongoose');

async function connectToMongo() {
  try { 
    await mongoose.connect('mongodb+srv://asfand_321:hello.com@cluster0.hbttq.mongodb.net/'); // URI COPIED FROM MONGO COMPASS
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = connectToMongo;
