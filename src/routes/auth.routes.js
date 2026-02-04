const router = require("express").Router();
const { login, getMe } = require ("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

router.post("/login", login);
router.get("/me",auth,getMe); // when /me is called take it to getMe method of auth controller, but before taking it to controller, go through the check in the auth middleware

module.exports = router