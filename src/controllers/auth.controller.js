const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "email is required" });

    const user = await User.findOne({ email }).select("+passwordResetToken +passwordResetExpires");

    // don’t reveal if user exists or not
    if (!user) return res.json({ message: "success" });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();

    return res.json({ message: "success", resetToken: rawToken }); // dev/testing
  } catch (err) {
    return res.status(500).json({ error: "server error", details: err.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "token and newPassword are required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select("+password");

    if (!user) return res.status(400).json({ error: "invalid or expired token" });

    user.password = newPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.json({ message: "password reset success" });
  } catch (err) {
    return res.status(500).json({ error: "server error", details: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "login success", token });
  } catch (err) {
    return res.status(500).json({ error: "server error", details: err.message });
  }
}

async function getMe(req, res) {
  const user = await User.findById(req.user.userId);
  return res.json(user);
}

module.exports = { login, getMe, forgotPassword, resetPassword };