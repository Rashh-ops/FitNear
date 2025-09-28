const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://fitnear-5.onrender.com" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/gyms", require("./routes/gymRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/payment", require("./routes/payment")); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
