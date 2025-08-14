require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const config = require("./config/config");
let indexRouter = require("./src/index");
const authMiddleware = require("./src/middlewares/authMiddleware");
const loginRoute = require("./src/admin/modules/login/routes/login.route");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_in_prod";

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(authMiddleware); 
app.use("/", loginRoute);

// CORS setup
const corsOptions = {
  origin: JSON.parse(config.corsOptions) || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const dummyUser = {
  username: "test",
  password: "test@123",
};

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Login API
app.post("/api/admin/login/authenticate", (req, res) => {
  const { username, password } = req.body;

  if (username !== dummyUser.username) {
    return res.status(400).json({
      success: false,
      field: "username",
      message: "Username not found",
    });
  }

  if (password !== dummyUser.password) {
    return res.status(400).json({
      success: false,
      field: "password",
      message: "Incorrect password",
    });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  req.session.token = token;

  return res.json({
    success: true,
    message: "Login successful",
    token,
  });
});


app.get("/api/admin/protected", (req, res) => {
  if (!req.session.token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(req.session.token, JWT_SECRET);
    return res.json({
      success: true,
      message: "Access granted",
      user: decoded,
    });
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
});
app.get("/dashboard", (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, welcome to the dashboard.`,
  });
});


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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/admin/login/authenticate`);
});

module.exports = app;
