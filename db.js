const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://gopikaa:Gopika123@cluster0.0vsxbtu.mongodb.net/todoDB"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;