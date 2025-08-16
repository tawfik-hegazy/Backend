const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.dbName,
    });

    console.log('DATABASE CONNECTION IS SUCCESSFUL');
  } catch (err) {
    console.log(' Error in connection:', err);
  }
};

module.exports = connectDB;
