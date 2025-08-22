// server.js (CommonJS version)

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { query, validationResult } = require("express-validator");

// Load env
dotenv.config();
const requiredEnv = [
  "PORT",
  "JWT_SECRET",
  "MONGO_URI",
  "AIRIQ_API_BASE_URL",
  "AIRIQ_API_KEY",
];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error("FATAL ERROR: Missing required environment variables:", missing);
  process.exit(1);
}

// Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// JWT middleware
function authenticate(req, res, next) {
  if (process.env.NODE_ENV === "development") return next();

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Axios instance for AirIQ
const airiq = axios.create({
  baseURL: process.env.AIRIQ_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.AIRIQ_API_KEY, // ✅ fixed to "apikey"
  },
});

// ✅ Flight Search Endpoint
app.get(
  "/api/flights/search",
  [
    query("origin").isLength({ min: 3, max: 4 }).isUppercase(),
    query("destination").isLength({ min: 3, max: 4 }).isUppercase(),
    query("departureDate").isISO8601(),
    query("returnDate").optional().isISO8601(),
    query("adults").optional().isInt({ min: 1 }),
  ],
  authenticate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // ✅ GET with query params
      const response = await airiq.get("/api/flights/search", {
        params: req.query,
        headers: { apikey: process.env.AIRIQ_API_KEY }, // ✅ ensure header on every request
      });

      res.json(response.data);
    } catch (err) {
      console.error("AirIQ API error:", err.response?.data || err.message);
      res
        .status(err.response?.status || 500)
        .json({ error: err.response?.data || "Failed to fetch flights" });
    }
  }
);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running with CommonJS and AirIQ integration");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
