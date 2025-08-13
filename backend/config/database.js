// Database configuration for MongoDB
const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asacoder_landing';
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected:`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Port: ${conn.connection.port}`);
    console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Server will continue without database (demo mode)');
    return null;
  }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB Disconnected');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error.message);
  }
};

module.exports = { connectDB, disconnectDB };
