import express from "express";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import Users from "../models/Users.js";

const router = express.Router();
const SecretKey = process.env.SECRETKEY;

// Signup Route
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

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await Users.create({
      FullName,
      Email,
      Mobile,
      Password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Login Route
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
      "thisissecret",
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});
router.get("/allusers",async(req,res)=>{
  try{
        const allUsers = await Users.find()
        console.log("All USers are here",allUsers.length) 
        res.status(200).json({message:"All users",allUsers})    
  }catch(error){
    console.log(error)
    res.status(500).json({message:"Intternal serever error",error})
  }
})

export default router;
