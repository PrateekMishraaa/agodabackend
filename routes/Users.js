import express from "express";
const router = express.Router();
import Users from "../models/Users.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs"; // ✅ Import bcrypt

const SecretKey = process.env.SECRETKEY;

// ✅ Signup route (unchanged, already good)
router.post("/signup", async (req, res) => {
  const { FullName, Email, Mobile, Password } = req.body;

  if (!FullName || !Email || !Mobile || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isUser = await Users.findOne({ Email });
    if (isUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const newUser = await Users.create({ FullName, Email, Mobile, Password });
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// ✅ Fixed login route
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const isUser = await Users.findOne({ Email });

    if (!isUser) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    const isMatch = await bcrypt.compare(Password, isUser.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = JWT.sign(
      {
        id: isUser._id,
        FullName: isUser.FullName,
        Email: isUser.Email,
      },
      "thisisecret",
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
