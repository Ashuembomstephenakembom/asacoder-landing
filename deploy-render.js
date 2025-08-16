#!/usr/bin/env node

/**
 * Render Deployment Helper Script for ASACODER
 * This script helps prepare and deploy your backend to Render
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 ASACODER Render Deployment Helper');
console.log('=====================================\n');

// Check if we're in the right directory
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: Please run this script from the project root directory');
  process.exit(1);
}

// Check backend directory
const backendPath = path.join(__dirname, 'backend');
if (!fs.existsSync(backendPath)) {
  console.error('❌ Error: Backend directory not found');
  process.exit(1);
}

console.log('✅ Project structure verified');

// Check if render.yaml exists
const renderYamlPath = path.join(backendPath, 'render.yaml');
if (!fs.existsSync(renderYamlPath)) {
  console.error('❌ Error: render.yaml not found in backend directory');
  console.log('Please ensure the render.yaml file is present');
  process.exit(1);
}

console.log('✅ Render configuration found');

// Check backend package.json
const backendPackageJsonPath = path.join(backendPath, 'package.json');
if (!fs.existsSync(backendPackageJsonPath)) {
  console.error('❌ Error: Backend package.json not found');
  process.exit(1);
}

const backendPackageJson = JSON.parse(fs.readFileSync(backendPackageJsonPath, 'utf8'));

// Verify required scripts
if (!backendPackageJson.scripts.start) {
  console.error('❌ Error: Backend package.json missing start script');
  process.exit(1);
}

console.log('✅ Backend package.json verified');

// Check for required dependencies
const requiredDeps = ['express', 'cors', 'dotenv'];
const missingDeps = requiredDeps.filter(dep => !backendPackageJson.dependencies[dep]);

if (missingDeps.length > 0) {
  console.error(`❌ Error: Missing required dependencies: ${missingDeps.join(', ')}`);
  console.log('Please install missing dependencies in the backend directory');
  process.exit(1);
}

console.log('✅ Required dependencies verified');

// Environment variables checklist
console.log('\n📋 Environment Variables Checklist:');
console.log('====================================');
console.log('Make sure to set these in your Render dashboard:');
console.log('');
console.log('Required:');
console.log('  NODE_ENV=production');
console.log('  PORT=10000');
console.log('  CORS_ORIGIN=https://asacoder.xyz');
console.log('  MONGODB_URI=your-mongodb-connection-string');
console.log('  EMAIL_USER=stephen@asaofficial.org');
console.log('  EMAIL_PASS=your-gmail-app-password');
console.log('  ADMIN_PASSWORD=your-secure-admin-password');
console.log('  JWT_SECRET=your-super-secure-jwt-secret-key');
console.log('');
console.log('Optional:');
console.log('  RATE_LIMIT_WINDOW_MS=900000');
console.log('  RATE_LIMIT_MAX_REQUESTS=100');
console.log('');

// Deployment steps
console.log('🚀 Deployment Steps:');
console.log('====================');
console.log('1. Push your code to GitHub');
console.log('2. Go to https://dashboard.render.com');
console.log('3. Click "New +" → "Web Service"');
console.log('4. Connect your GitHub repository');
console.log('5. Configure the service:');
console.log('   - Name: asacoder-backend');
console.log('   - Environment: Node');
console.log('   - Root Directory: backend');
console.log('   - Build Command: npm install');
console.log('   - Start Command: npm start');
console.log('6. Set environment variables (see checklist above)');
console.log('7. Click "Create Web Service"');
console.log('8. Wait for deployment to complete');
console.log('');

// Test deployment
console.log('🧪 After Deployment Testing:');
console.log('============================');
console.log('1. Check service status is "Live"');
console.log('2. Test these endpoints:');
console.log('   - GET / (should return API info)');
console.log('   - POST /api/contact/submit (contact form)');
console.log('   - GET /admin (admin dashboard)');
console.log('3. Update frontend VITE_API_URL to your Render URL');
console.log('4. Test complete contact form functionality');
console.log('');

// Frontend update reminder
console.log('📝 Frontend Update Required:');
console.log('============================');
console.log('After backend deployment, update your frontend:');
console.log('1. Set VITE_API_URL environment variable');
console.log('2. Or update the fallback URL in Contact.jsx');
console.log('3. Redeploy frontend to your hosting platform');
console.log('');

console.log('✅ Deployment preparation complete!');
console.log('📚 For detailed instructions, see RENDER_DEPLOYMENT_GUIDE.md');
console.log('');

// Optional: Check git status
try {
  const gitStatus = execSync('git status --porcelain', { cwd: __dirname, encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('⚠️  Warning: You have uncommitted changes');
    console.log('Consider committing your changes before deployment');
    console.log('');
  } else {
    console.log('✅ All changes committed');
  }
} catch (error) {
  console.log('⚠️  Could not check git status');
}

console.log('🎉 Ready for Render deployment!');
