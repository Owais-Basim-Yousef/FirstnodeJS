const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "no token provided" });
  }

  // Accept:
  // "Bearer <token>"  OR  just "<token>"
  let token = header;

  if (header.startsWith("Bearer ")) {
    token = header.slice(7).trim(); // remove "Bearer "
  } else {
    token = header.trim();
  }

  if (!token) {
    return res.status(401).json({ error: "invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "invalid or expired token" });
  }
}

module.exports = auth;