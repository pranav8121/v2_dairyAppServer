require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("./config/config");
const redisClient = require("./config/redis");
let indexRouter = require("./src/index");
const authMiddleware = require("./src/middlewares/authMiddleware");

let corsOptions = {
  origin: JSON.parse(config.corsOptions),
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    redis: {
      connected: redisClient.isConnected,
      status: redisClient.isConnected ? "Connected" : "Disconnected",
    },
  });
});


app.use(authMiddleware);
app.use("/api/", indexRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  // try {
  //   await redisClient.connect();
  //   console.log("✅ Redis connected successfully");
  // } catch (error) {
  //   console.error("❌ Failed to connect to Redis:", error.message);
  // }

  console.log(`📚 API Documentation:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await redisClient.disconnect();
  } catch (error) {
    console.error("❌ Error disconnecting Redis:", error.message);
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  try {
    await redisClient.disconnect();
  } catch (error) {
    console.error("❌ Error disconnecting Redis:", error.message);
  }
  process.exit(0);
});

module.exports = app;
