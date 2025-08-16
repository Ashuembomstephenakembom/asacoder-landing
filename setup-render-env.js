#!/usr/bin/env node

/**
 * Render Environment Variables Setup Helper
 * This script helps you prepare environment variables for Render deployment
 */

const fs = require('fs');
const crypto = require('crypto');

console.log('🔧 Render Environment Variables Setup');
console.log('=====================================\n');

// Generate secure random strings
const generateSecret = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log('📋 Environment Variables for Render Dashboard:');
console.log('==============================================\n');

console.log('Required Variables:');
console.log('-------------------');
console.log(`NODE_ENV=production`);
console.log(`PORT=10000`);
console.log(`CORS_ORIGIN=https://asacoder.xyz`);
console.log(`MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/asacoder?retryWrites=true&w=majority`);
console.log(`EMAIL_USER=stephen@asaofficial.org`);
console.log(`EMAIL_PASS=your-gmail-app-password`);
console.log(`ADMIN_PASSWORD=${generateSecret(16)}`);
console.log(`JWT_SECRET=${generateJWTSecret()}`);
console.log('');

console.log('Optional Variables:');
console.log('-------------------');
console.log(`RATE_LIMIT_WINDOW_MS=900000`);
console.log(`RATE_LIMIT_MAX_REQUESTS=100`);
console.log(`GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID`);
console.log(`SENTRY_DSN=your-sentry-dsn-if-using`);
console.log('');

console.log('📝 Instructions:');
console.log('================');
console.log('1. Copy the values above');
console.log('2. Go to your Render service dashboard');
console.log('3. Navigate to Environment → Environment Variables');
console.log('4. Add each variable with its corresponding value');
console.log('5. Replace placeholder values with your actual data:');
console.log('   - MONGODB_URI: Your actual MongoDB connection string');
console.log('   - EMAIL_PASS: Your Gmail App Password');
console.log('   - GOOGLE_ANALYTICS_ID: Your GA measurement ID (if using)');
console.log('');

console.log('🔐 Security Notes:');
console.log('==================');
console.log('✅ JWT_SECRET and ADMIN_PASSWORD are auto-generated above');
console.log('✅ Keep these values secure and never commit them to git');
console.log('✅ Use Render\'s environment variable system for all sensitive data');
console.log('✅ Regularly rotate JWT_SECRET and ADMIN_PASSWORD');
console.log('');

console.log('📧 Email Setup:');
console.log('===============');
console.log('For Gmail App Password:');
console.log('1. Go to your Google Account settings');
console.log('2. Navigate to Security → 2-Step Verification');
console.log('3. Create an App Password for "Mail"');
console.log('4. Use that password as EMAIL_PASS');
console.log('');

console.log('🗄️ MongoDB Setup:');
console.log('==================');
console.log('For MongoDB Atlas:');
console.log('1. Create a cluster at https://cloud.mongodb.com');
console.log('2. Create a database user with read/write permissions');
console.log('3. Get your connection string from the cluster');
console.log('4. Replace username, password, and cluster details');
console.log('');

console.log('✅ Environment variables ready for Render!');
console.log('🚀 Proceed with deployment using the RENDER_DEPLOYMENT_GUIDE.md');
