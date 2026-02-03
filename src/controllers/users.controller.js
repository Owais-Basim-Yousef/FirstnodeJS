const User = require("../models/User");

// POST /api/users
async function createUser(req, res) {
  try {
    const { name, email, age } = req.body;
    if (!name || !email) return res.status(400).json({ error: "name and email are required" });

    const user = await User.create({ name, email, age });
    return res.status(201).json(user);
  } catch (err) {
    // duplicate email error
    if (err.code === 11000) return res.status(409).json({ error: "email already exists" });
    return res.status(500).json({ error: "server error", details: err.message });
  }
}

// GET /api/users
async function getUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "server error", details: err.message });
  }
}

// GET /api/users/:id
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "invalid id" });
  }
}

// PUT /api/users/:id
async function updateUser(req, res) {
  try {
    const { name, email, age } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: "email already exists" });
    return res.status(400).json({ error: "bad request", details: err.message });
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json({ message: "deleted ✅", id: user._id });
  } catch (err) {
    return res.status(400).json({ error: "invalid id" });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
