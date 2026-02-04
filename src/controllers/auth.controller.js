const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

async function login(req, res) {
    try{
        const {email , password} = req.body
        if (!email|| !password) return res.status(400).json({error: "email and password are required" });
      
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(401).json({ error: "invalid credentials"});
    
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({error: "invalid credentials" });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h"});

        return res.json({ message: "login success ", token} );
    } catch (err) {
        return res.status(500).json({error: "server error", details: err.message });

    }

}

async function getMe(req, res) {
  const user = await User.findById(req.user.userId); // req.user comes from token
  return res.json(user);
}


module.exports = {login,getMe};