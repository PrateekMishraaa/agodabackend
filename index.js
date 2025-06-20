import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/Users.js";
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // if you're using cookies
}));

// Routes
app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
// `px8FkCd8RuLBkcK5`