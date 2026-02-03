const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
