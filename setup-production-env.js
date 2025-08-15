#!/usr/bin/env node

/**
 * Production Environment Setup Script for ASACODER.xyz
 * This script helps configure environment variables for production deployment
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 ASACODER.xyz Production Environment Setup');
console.log('============================================\n');

// Questions to ask the user
const questions = [
  {
    name: 'herokuAppName',
    question: 'Enter your Heroku app name (e.g., asacoder-backend-123): ',
    required: true
  },
  {
    name: 'vercelDomain',
    question: 'Enter your Vercel domain (e.g., asacoder-landing.vercel.app): ',
    required: true
  },
  {
    name: 'mongodbUri',
    question: 'Enter your MongoDB connection string (or press Enter to skip): ',
    required: false
  },
  {
    name: 'adminPassword',
    question: 'Enter admin password for dashboard: ',
    required: true
  }
];

async function askQuestions() {
  const answers = {};
  
  for (const q of questions) {
    const answer = await new Promise((resolve) => {
      rl.question(q.question, (input) => {
        if (q.required && !input.trim()) {
          console.log('❌ This field is required!');
          resolve(askQuestions());
        } else {
          resolve(input.trim());
        }
      });
    });
    
    if (answer === askQuestions) {
      return await askQuestions();
    }
    
    answers[q.name] = answer;
  }
  
  return answers;
}

function generateFrontendEnv(answers) {
  return `# Production Environment Variables for ASACODER.xyz Frontend
# Generated on ${new Date().toISOString()}

# Backend API URL
VITE_API_URL=https://${answers.herokuAppName}.herokuapp.com

# Optional: Analytics
VITE_GA_ID=your-google-analytics-id
`;
}

function generateBackendEnv(answers) {
  return `# PRODUCTION ENVIRONMENT VARIABLES FOR ASACODER.XYZ
# Generated on ${new Date().toISOString()}
# ⚠️  DO NOT COMMIT THIS FILE TO GIT - Use platform environment variables instead

# Server Configuration
NODE_ENV=production
PORT=5000

# CORS Configuration
CORS_ORIGIN=https://${answers.vercelDomain}

# Database Configuration
${answers.mongodbUri ? `MONGODB_URI=${answers.mongodbUri}` : '# MONGODB_URI=your-mongodb-connection-string'}

# Email Configuration (Gmail with App Password)
EMAIL_USER=contact@asacoder.xyz
EMAIL_PASS=your-gmail-app-password-here

# Admin Configuration
ADMIN_PASSWORD=${answers.adminPassword}

# Security Configuration
JWT_SECRET=${generateRandomString(64)}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: Analytics and Monitoring
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
SENTRY_DSN=your-sentry-dsn-if-using
`;
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateDeploymentInstructions(answers) {
  return `# 🚀 Deployment Instructions for ASACODER.xyz

## Frontend (Vercel) Configuration

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add the following variable:
     - Name: \`VITE_API_URL\`
     - Value: \`https://${answers.herokuAppName}.herokuapp.com\`
     - Environment: Production, Preview, Development

2. **Redeploy Frontend:**
   - Push changes to your repository
   - Vercel will automatically redeploy

## Backend (Heroku) Configuration

1. **Set Environment Variables in Heroku:**
   \`\`\`bash
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://${answers.vercelDomain}
   heroku config:set ADMIN_PASSWORD=${answers.adminPassword}
   heroku config:set JWT_SECRET=${generateRandomString(32)}
   \`\`\`

2. **Set MongoDB URI (if you have one):**
   \`\`\`bash
   heroku config:set MONGODB_URI=your-mongodb-connection-string
   \`\`\`

3. **Deploy Backend:**
   \`\`\`bash
   git add .
   git commit -m "Update production configuration"
   git push heroku main
   \`\`\`

## Testing

1. **Test Contact Form:**
   - Visit your Vercel site
   - Try submitting the contact form
   - Check browser console for errors

2. **Test Admin Dashboard:**
   - Visit: https://${answers.herokuAppName}.herokuapp.com/admin
   - Login with password: ${answers.adminPassword}

## Troubleshooting

- Check Heroku logs: \`heroku logs --tail\`
- Check Vercel deployment logs in dashboard
- Verify CORS settings if getting connection errors
`;
}

async function main() {
  try {
    const answers = await askQuestions();
    
    console.log('\n📝 Generating configuration files...\n');
    
    // Generate frontend .env.production
    const frontendEnv = generateFrontendEnv(answers);
    fs.writeFileSync('frontend/.env.production', frontendEnv);
    console.log('✅ Generated: frontend/.env.production');
    
    // Generate backend .env.production
    const backendEnv = generateBackendEnv(answers);
    fs.writeFileSync('backend/.env.production', backendEnv);
    console.log('✅ Generated: backend/.env.production');
    
    // Generate deployment instructions
    const instructions = generateDeploymentInstructions(answers);
    fs.writeFileSync('DEPLOYMENT_INSTRUCTIONS.md', instructions);
    console.log('✅ Generated: DEPLOYMENT_INSTRUCTIONS.md');
    
    console.log('\n🎉 Configuration files generated successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Review the generated files');
    console.log('2. Follow the instructions in DEPLOYMENT_INSTRUCTIONS.md');
    console.log('3. Set environment variables in Vercel and Heroku');
    console.log('4. Deploy both frontend and backend');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
