const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

dotenv.config();
connectDB(); // CONNECT DB

app.use(cors());
app.use(express.json());

// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

app.get("/", (req, res) => {
  res.send("GiftBuilder Backend is Running");
});