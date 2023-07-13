import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
    const accessToken = jwt.sign({ email, role }, process.env.JWT_SECRET, {
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
      const accessToken = jwt.sign(
        { email, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.json({ email, accessToken });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
});

export default router;
