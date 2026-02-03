const express = require("express");
const usersRoutes = require("./routes/users.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running ✅" });
});

app.post("/debug-body", (req, res) => {
  res.json({
    contentType: req.headers["content-type"],
    bodyType: typeof req.body,
    body: req.body,
  });
});

app.use("/api/users", usersRoutes);

module.exports = app;
