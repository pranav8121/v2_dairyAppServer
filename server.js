require('dotenv').config();
const express = require('express');
let cookieParser = require('cookie-parser');
let cors = require('cors');
const config = require('./config/config');
let bodyParser = require('body-parser');
let knex = require('./config/db');
const redisClient = require('./config/redis');
let indexRouter = require('./src/index');

let corsOptions = {
  origin: JSON.parse(config.corsOptions),
  optionsSuccessStatus: 200,
  credentials: true,
}


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors(corsOptions))

// Routes
app.get('/', (req, res) => {

});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    redis: {
      connected: redisClient.isConnected,
      status: redisClient.isConnected ? 'Connected' : 'Disconnected'
    }
  });
});

app.use('/api/', indexRouter);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});


app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  
  // Initialize Redis connection
  try {
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error.message);
  }
  
  console.log(`📚 API Documentation:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/admin/login`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  try {
    await redisClient.disconnect();
    console.log('✅ Redis disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting Redis:', error.message);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  try {
    await redisClient.disconnect();
    console.log('✅ Redis disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting Redis:', error.message);
  }
  
  process.exit(0);
});

module.exports = app;
