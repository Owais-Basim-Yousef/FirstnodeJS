const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  usersCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Stats", statsSchema);
