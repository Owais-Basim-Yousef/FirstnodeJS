require("dotenv").config();
console.log("Loaded MONGO_URI?", Boolean(process.env.MONGO_URI));

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
}

start();
