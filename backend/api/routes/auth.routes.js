const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ message: "please provide all the required fields" });
    return;
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  let user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "user already exists" });
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  user = await User.create({ email, name, password: hashedPassword });
  res.status(201).json({ user: { name, email, _id: user._id } });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "please provide all the required fields" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user does not exist" });
    return;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ message: "Unable to authenticate the user" });
    return;
  }
  const payload = { email, name: user.name, _id: user._id };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "6h",
    algorithm: "HS256",
  });
  res.json({ token });
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});


module.exports = router;