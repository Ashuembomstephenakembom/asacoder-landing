// Backend server for ASACODER landing page contact form
// This file will handle the contact form submissions with comprehensive security

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/database');
const { setupSecurity, validateInput, limitRequestSize } = require('./middleware/security');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// PRODUCTION: Remove hardcoded ngrok URL
// const NGROK_URL = 'https://476edd4dd8ed.ngrok-free.app';

// Setup comprehensive security middleware (includes CORS)
setupSecurity(app);
// Request size limiting
app.use(limitRequestSize);

// Body parsing middleware with size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Input validation middleware
app.use(validateInput);

// Connect to MongoDB
connectDB().then(conn => {
  if (conn) {
    console.log('✅ Database connection successful');
  } else {
    console.log('⚠️  Running in demo mode without database');
  }
}).catch(err => {
  console.log('⚠️  MongoDB connection failed, but server will continue running');
  console.log('   This is normal for development without MongoDB');
});

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'ASACODER Landing Page Backend API',
    database: 'MongoDB Connected',
    timestamp: new Date().toISOString()
  });
});

// Test contact form endpoint (without validation for debugging)
app.post('/api/contact/test', (req, res) => {
  console.log('Test contact form submission:', req.body);
  res.json({
    success: true,
    message: 'Test endpoint working',
    received: req.body
  });
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Production URL: https://api.asacoder.xyz`);
  console.log(`📊 MongoDB: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
  
  // Show database name from connection string if available
  if (process.env.MONGODB_URI) {
    try {
      const dbName = process.env.MONGODB_URI.split('/').pop().split('?')[0];
      console.log(`🗄️  Database Name: ${dbName}`);
    } catch (error) {
      console.log(`🗄️  Database Name: Unable to parse from connection string`);
    }
  }
});
