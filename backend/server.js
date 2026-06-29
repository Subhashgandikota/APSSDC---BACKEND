const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware (must be before routes)
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Student Result Management API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});