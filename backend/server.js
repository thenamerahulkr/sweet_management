const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const sweetRoutes = require('./routes/sweets');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration for Vercel deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    /\.vercel\.app$/,
    'https://sweet-management-frontend.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database connection for serverless
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to MongoDB');
      return mongoose.connections[0];
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Middleware to ensure DB connection before routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Routes (after DB connection middleware)
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sweet Shop API is running!' });
});

const PORT = process.env.PORT || 3001;

// Start server only if not in test environment or Vercel
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

// Export for Vercel
module.exports = app;