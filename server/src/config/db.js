const mongoose = require("mongoose");
const dns = require("dns");

// Ensure reliable SRV record resolution on Windows for MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {
  // Ignore if not permitted
}

const connectDB = async (retries = 5, delayMs = 2000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, error.message);
      if (attempt === retries) {
        console.error("All MongoDB connection attempts exhausted. Please check network/URI.");
      } else {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
};

module.exports = connectDB;