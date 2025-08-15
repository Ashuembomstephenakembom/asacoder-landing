#!/usr/bin/env node

/**
 * Quick Fix Script for ASACODER.xyz Deployment Issues
 * This script helps identify and fix common deployment problems
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

console.log('🔧 ASACODER.xyz Quick Fix Script');
console.log('================================\n');

// Configuration
const config = {
  frontendUrl: 'https://asacoder-landing.vercel.app',
  backendUrl: 'https://your-new-backend-url.com', // TODO: Update when new backend is ready
  testEndpoints: [
    '/',
    '/api/contact/test',
    '/admin'
  ]
};

// Test URL connectivity
function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode >= 200 && res.statusCode < 300
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        error: err.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

// Check environment files
function checkEnvironmentFiles() {
  console.log('📁 Checking environment files...');
  
  const files = [
    'frontend/.env.production',
    'backend/.env.production',
    'frontend/.env',
    'backend/.env'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const hasApiUrl = content.includes('VITE_API_URL') || content.includes('API_URL');
      console.log(`  ${file}: ${hasApiUrl ? '✅' : '❌'} ${hasApiUrl ? 'Found' : 'Missing API URL'}`);
    } else {
      console.log(`  ${file}: ❌ Not found`);
    }
  });
}

// Check package.json files
function checkPackageFiles() {
  console.log('\n📦 Checking package.json files...');
  
  const files = [
    'frontend/package.json',
    'backend/package.json'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log(`  ${file}: ✅ Found (${content.name})`);
      
      // Check for required dependencies
      if (file.includes('frontend')) {
        const hasAxios = content.dependencies?.axios || content.devDependencies?.axios;
        console.log(`    Axios: ${hasAxios ? '✅' : '❌'}`);
      }
      
      if (file.includes('backend')) {
        const hasCors = content.dependencies?.cors;
        const hasExpress = content.dependencies?.express;
        console.log(`    CORS: ${hasCors ? '✅' : '❌'}`);
        console.log(`    Express: ${hasExpress ? '✅' : '❌'}`);
      }
    } else {
      console.log(`  ${file}: ❌ Not found`);
    }
  });
}

// Test backend endpoints
async function testBackendEndpoints() {
  console.log('\n🌐 Testing backend endpoints...');
  
  for (const endpoint of config.testEndpoints) {
    const url = `${config.backendUrl}${endpoint}`;
    const result = await testUrl(url);
    
    if (result.success) {
      console.log(`  ${endpoint}: ✅ ${result.status}`);
    } else {
      console.log(`  ${endpoint}: ❌ ${result.status} - ${result.error || 'Failed'}`);
    }
  }
}

// Test frontend
async function testFrontend() {
  console.log('\n🎨 Testing frontend...');
  
  const result = await testUrl(config.frontendUrl);
  
  if (result.success) {
    console.log(`  Frontend: ✅ ${result.status}`);
  } else {
    console.log(`  Frontend: ❌ ${result.status} - ${result.error || 'Failed'}`);
  }
}

// Generate fix suggestions
function generateFixSuggestions() {
  console.log('\n💡 Fix Suggestions:');
  console.log('==================');
  
  console.log('\n1. **Environment Variables (Vercel):**');
  console.log('   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables');
  console.log('   - Add: VITE_API_URL = https://your-heroku-app-name.herokuapp.com');
  console.log('   - Redeploy the project');
  
  console.log('\n2. **Environment Variables (Heroku):**');
  console.log('   - Run: heroku config:set NODE_ENV=production');
  console.log('   - Run: heroku config:set CORS_ORIGIN=https://asacoder-landing.vercel.app');
  console.log('   - Run: heroku config:set ADMIN_PASSWORD=your-secure-password');
  
  console.log('\n3. **CORS Issues:**');
  console.log('   - Check if your Vercel domain is in the allowed origins list');
  console.log('   - Update backend/middleware/security.js if needed');
  
  console.log('\n4. **Database Issues:**');
  console.log('   - Set MONGODB_URI in Heroku if using MongoDB');
  console.log('   - Or the backend will run in demo mode without database');
  
  console.log('\n5. **Deployment:**');
  console.log('   - Frontend: Push to GitHub (Vercel auto-deploys)');
  console.log('   - Backend: git push heroku main');
}

// Main function
async function main() {
  try {
    checkEnvironmentFiles();
    checkPackageFiles();
    await testBackendEndpoints();
    await testFrontend();
    generateFixSuggestions();
    
    console.log('\n✅ Quick fix analysis complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Update the backendUrl in this script with your actual Heroku URL');
    console.log('2. Run: node setup-production-env.js');
    console.log('3. Follow the generated deployment instructions');
    
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  }
}

main();
