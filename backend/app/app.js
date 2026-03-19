const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const { testConnection } = require('./config/database');
const User = require('./models/User');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test database connection
testConnection();

// Sync database
const syncDatabase = async () => {
  try {
    await User.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};
syncDatabase();

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;