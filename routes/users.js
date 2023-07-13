const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
router.use(bodyParser.json());

// Signup endpoint
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("signup req", { name, email, password, role });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    const accessToken = jwt.sign({ email, role }, "secret_key", {
      expiresIn: "1d",
    });
    console.log("signup res", { email, accessToken });
    res.json({ email, accessToken });
  } catch (err) {
    res.status(500).json({ error: "Failed to signup" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const accessToken = jwt.sign({ email, role: user.role }, "secret_key", {
        expiresIn: "1d",
      });
      res.json({ email, accessToken });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
