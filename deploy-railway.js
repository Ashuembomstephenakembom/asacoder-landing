#!/usr/bin/env node

/**
 * Railway Deployment Preparation Script
 * This script helps prepare your backend for Railway deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚂 Railway Deployment Preparation');
console.log('================================\n');

// Check required files
const requiredFiles = [
  'backend/server.js',
  'backend/package.json',
  'backend/railway.json',
  'backend/middleware/security.js',
  'backend/routes/contactRoutes.js',
  'backend/controllers/contactController.js'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - Missing!`);
    allFilesExist = false;
  }
});

// Check package.json
console.log('\n📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
  
  // Check required fields
  const requiredFields = ['name', 'version', 'main', 'scripts'];
  requiredFields.forEach(field => {
    if (packageJson[field]) {
      console.log(`  ✅ ${field}: ${packageJson[field]}`);
    } else {
      console.log(`  ❌ ${field}: Missing!`);
      allFilesExist = false;
    }
  });
  
  // Check scripts
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log(`  ✅ start script: ${packageJson.scripts.start}`);
  } else {
    console.log(`  ❌ start script: Missing!`);
    allFilesExist = false;
  }
  
  // Check dependencies
  const requiredDeps = ['express', 'cors', 'dotenv'];
  console.log('\n🔧 Checking dependencies...');
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`  ❌ ${dep}: Missing!`);
      allFilesExist = false;
    }
  });
  
} catch (error) {
  console.log(`  ❌ Error reading package.json: ${error.message}`);
  allFilesExist = false;
}

// Check railway.json
console.log('\n🚂 Checking railway.json...');
try {
  const railwayJson = JSON.parse(fs.readFileSync('backend/railway.json', 'utf8'));
  console.log(`  ✅ railway.json is valid`);
  console.log(`  📋 Builder: ${railwayJson.build?.builder || 'Not specified'}`);
  console.log(`  🚀 Start Command: ${railwayJson.deploy?.startCommand || 'Not specified'}`);
} catch (error) {
  console.log(`  ❌ Error reading railway.json: ${error.message}`);
  allFilesExist = false;
}

// Generate deployment summary
console.log('\n📋 Deployment Summary:');
console.log('=====================');

if (allFilesExist) {
  console.log('✅ All required files are present');
  console.log('✅ Backend is ready for Railway deployment');
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Go to Railway Dashboard: https://railway.app/dashboard');
  console.log('2. Create new project from GitHub repo');
  console.log('3. Select the backend directory as source');
  console.log('4. Set environment variables:');
  console.log('   - NODE_ENV=production');
  console.log('   - CORS_ORIGIN=https://asacoder-landing.vercel.app,https://asacoder.xyz,https://www.asacoder.xyz');
  console.log('   - ADMIN_PASSWORD=your-secure-password');
  console.log('5. Deploy and get your Railway URL');
  console.log('6. Update frontend with Railway URL');
  
} else {
  console.log('❌ Some required files are missing');
  console.log('❌ Please fix the issues above before deploying');
}

console.log('\n📖 For detailed instructions, see: RAILWAY_DEPLOYMENT_GUIDE.md');
console.log('🔧 For troubleshooting, see: DEPLOYMENT_FIX_GUIDE.md');

console.log('\n✅ Railway deployment preparation complete!');
