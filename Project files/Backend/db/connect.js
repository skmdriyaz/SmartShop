const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/grocery', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected successfully`);
  } catch (e) {
    console.error(`❌ MongoDB connection failed: ${e.message}`);
    process.exit(1); // Exit app if DB connection fails
  }
};

module.exports = connectDB;
