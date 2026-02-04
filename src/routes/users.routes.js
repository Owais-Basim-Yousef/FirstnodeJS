const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Public route (signup)
router.post("/", createUser);

// Protected routes
router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
