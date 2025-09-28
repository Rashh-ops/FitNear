const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/gyms", require("./routes/gymRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/payment", require("./routes/payment")); // 👈 add this

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
