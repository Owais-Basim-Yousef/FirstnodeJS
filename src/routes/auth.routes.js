const router = require("express").Router();
const { login, getMe, forgotPassword, resetPassword } = require ("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

router.post("/login", login);
router.get("/me",auth,getMe); // when /me is called take it to getMe method of auth controller, but before taking it to controller, go through the check in the auth middleware


router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;