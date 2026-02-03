const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;

  console.log("URI starts with:", uri ? uri.slice(0, 20) : "MISSING");
  console.log("Has space before mongodb?:", uri ? uri.includes(" mongodb") : "N/A");
  console.log("Has 'MONGO_URI=' inside?:", uri ? uri.includes("MONGO_URI=") : "N/A");

  if (!uri) throw new Error("MONGO_URI is missing");

  await mongoose.connect(uri);
  console.log("MongoDB connected ✅");
}

module.exports = connectDB;
