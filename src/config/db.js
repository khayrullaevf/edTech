const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB ulanish muvaffaqiyatli!");
  } catch (error) {
    console.error("DB ulanishda xatolik:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

