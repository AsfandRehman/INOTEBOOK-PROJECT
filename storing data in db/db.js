const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/'); // URI COPIED FROM MONGO COMPASS
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = connectToMongo;
