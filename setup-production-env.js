#!/usr/bin/env node

const crypto = require('crypto');

console.log('🔧 ASACODER Production Environment Setup');
console.log('==========================================\n');

// Generate secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('📋 Environment Variables for Render Backend:');
console.log('=============================================');
console.log('NODE_ENV=production');
console.log('PORT=10000');
console.log('CORS_ORIGIN=https://asacoder.xyz');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('ADMIN_PASSWORD=asacoder2025');
console.log('RATE_LIMIT_WINDOW_MS=900000');
console.log('RATE_LIMIT_MAX_REQUESTS=100');
console.log('\n📧 Email Configuration:');
console.log('EMAIL_USER=stephen@asaofficial.org');
console.log('EMAIL_PASS=[Your Gmail App Password]');
console.log('\n🗄️ Database Configuration:');
console.log('MONGODB_URI=[Your MongoDB Connection String]');
console.log('\n🌐 Frontend Environment:');
console.log('VITE_API_URL=https://asacoder-backend.onrender.com');

console.log('\n📝 Instructions:');
console.log('1. Copy these variables to your Render backend service');
console.log('2. Replace [Your Gmail App Password] with your actual Gmail app password');
console.log('3. Replace [Your MongoDB Connection String] with your MongoDB URI');
console.log('4. For Gmail setup: Enable 2FA and generate an App Password');
console.log('5. For MongoDB: Use MongoDB Atlas or your preferred MongoDB provider');

console.log('\n🔐 Security Notes:');
console.log('- Keep your JWT_SECRET secure and unique');
console.log('- Use a strong admin password in production');
console.log('- Enable 2FA on your Gmail account');
console.log('- Use MongoDB Atlas for reliable database hosting');

console.log('\n✅ Your backend is ready for deployment!');
