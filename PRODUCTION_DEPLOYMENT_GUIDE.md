# 🚀 ASACODER.xyz - Production Deployment Guide

## 📋 **PRE-DEPLOYMENT CHECKLIST FOR ASACODER.XYZ**

### ✅ **CRITICAL CHANGES REQUIRED BEFORE DEPLOYMENT**

## 🔧 **1. FRONTEND CONFIGURATION CHANGES**

### **A. Update API Configuration (CRITICAL)**

**File: `frontend/src/components/Contact.jsx`**
```javascript
// CHANGE THIS FUNCTION (around line 30):
const getBackendUrl = () => {
  // PRODUCTION: Use environment variable or fallback to your domain
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // FALLBACK: Use your domain
  return 'https://api.asacoder.xyz';
}
```

**File: `frontend/src/components/AdminPanel.jsx`**
```javascript
// CHANGE THIS FUNCTION (around line 30):
const getBackendUrl = () => {
  // PRODUCTION: Use environment variable or fallback to your domain
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // FALLBACK: Use your domain
  return 'https://api.asacoder.xyz';
}
```

**File: `frontend/src/components/ConnectionStatus.jsx`**
```javascript
// CHANGE THIS FUNCTION (around line 15):
const getBackendUrl = () => {
  // PRODUCTION: Use environment variable or fallback to your domain
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // FALLBACK: Use your domain
  return 'https://api.asacoder.xyz';
}
```

### **B. Update Vite Configuration**

**File: `frontend/vite.config.js`**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // PRODUCTION: Remove development-specific settings
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  // ADD: Build optimization for production
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
```

### **C. Update Footer Domain References**

**File: `frontend/src/components/Footer.jsx`**
```javascript
// CHANGE: Update email domain (around line 60)
<a href="mailto:contact@asacoder.xyz" className="contact-item">
  <FaEnvelope className="contact-icon email-icon" />
  <span className="contact-text">contact@asacoder.xyz</span>
</a>

// CHANGE: Update privacy policy links (around line 45 and 95)
<li><a href="https://asacoder.xyz/privacy-policy">Privacy Policy</a></li>

// CHANGE: Update terms of service links (around line 95)
<a href="https://asacoder.xyz/terms-of-service" className="bottom-link">Terms of Service</a>
<a href="https://asacoder.xyz/privacy-policy" className="bottom-link">Privacy Policy</a>
```

## 🔧 **2. BACKEND CONFIGURATION CHANGES**

### **A. Update CORS Configuration**

**File: `backend/middleware/security.js`**
```javascript
// CHANGE: Update allowed origins (around line 25)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://asacoder.xyz',
  'https://www.asacoder.xyz',
  'https://api.asacoder.xyz',
  'https://*.vercel.app', // Allow Vercel preview URLs
  'https://*.ngrok-free.app' // Keep for development
];
```

### **B. Update Server Configuration**

**File: `backend/server.js`**
```javascript
// REMOVE: Hardcoded ngrok URL (around line 15)
// const NGROK_URL = 'https://476edd4dd8ed.ngrok-free.app';

// CHANGE: Update CORS configuration (around line 20)
app.use((req, res, next) => {
  // PRODUCTION: Use environment variable for CORS origin
  const allowedOrigin = process.env.CORS_ORIGIN || 'https://asacoder.xyz';
  
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// CHANGE: Update server startup message (around line 80)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Production URL: https://api.asacoder.xyz`);
  console.log(`📊 MongoDB: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
  
  if (process.env.MONGODB_URI) {
    try {
      const dbName = process.env.MONGODB_URI.split('/').pop().split('?')[0];
      console.log(`🗄️  Database Name: ${dbName}`);
    } catch (error) {
      console.log(`🗄️  Database Name: Unable to parse from connection string`);
    }
  }
});
```

### **C. Create Production Environment File**

**File: `backend/.env.production`**
```env
# PRODUCTION ENVIRONMENT VARIABLES
NODE_ENV=production
PORT=5000

# CORS Configuration
CORS_ORIGIN=https://asacoder.xyz

# Database Configuration
MONGODB_URI=your-production-mongodb-atlas-uri

# Email Configuration
EMAIL_USER=contact@asacoder.xyz
EMAIL_PASS=your-app-password-here

# Admin Configuration
ADMIN_PASSWORD=your-secure-admin-password

# Security Configuration
JWT_SECRET=your-jwt-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🌐 **3. VERCEL DEPLOYMENT (FRONTEND)**

### **A. Repository Preparation**
```bash
# 1. Create a separate repository for frontend (RECOMMENDED)
# OR use the current repository with proper configuration

# 2. Update package.json scripts
cd frontend
```

**File: `frontend/package.json` - Add build script**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### **B. Vercel Configuration**

**File: `frontend/vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### **C. Environment Variables in Vercel**
```env
# Add these in Vercel dashboard
VITE_API_URL=https://api.asacoder.xyz
NODE_ENV=production
```

### **D. Deployment Steps**
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Set Root Directory: `landing-pages/asacoder-landing/frontend`

2. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables:**
   - `VITE_API_URL`: `https://api.asacoder.xyz`

4. **Deploy:**
   - Click "Deploy"
   - Your site will be at: `https://your-project.vercel.app`

5. **Custom Domain Setup:**
   - Go to Settings → Domains
   - Add: `asacoder.xyz`
   - Add: `www.asacoder.xyz`
   - Update DNS records as instructed

## ☁️ **4. HEROKU DEPLOYMENT (BACKEND)**

### **A. Heroku Configuration**

**File: `backend/Procfile`**
```
web: npm start
```

**File: `backend/package.json` - Update scripts**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'",
    "postinstall": "echo 'Post-install complete'"
  }
}
```

### **B. Heroku Deployment Steps**

1. **Install Heroku CLI:**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   cd backend
   heroku create asacoder-api
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://asacoder.xyz
   heroku config:set MONGODB_URI=your-mongodb-atlas-connection-string
   heroku config:set EMAIL_USER=contact@asacoder.xyz
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set ADMIN_PASSWORD=your-secure-admin-password
   heroku config:set JWT_SECRET=your-jwt-secret-key
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

5. **Custom Domain Setup:**
   ```bash
   heroku domains:add api.asacoder.xyz
   # Update DNS records as instructed by Heroku
   ```

## 🗄️ **5. MONGODB ATLAS SETUP**

### **A. Create MongoDB Atlas Cluster**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Set up database user
4. Get connection string

### **B. Network Access**
- Add IP: `0.0.0.0/0` (allow all IPs for Heroku)
- Or add specific Heroku IP ranges

### **C. Environment Variable**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/asacoder?retryWrites=true&w=majority
```

## 🔒 **6. SECURITY CONFIGURATIONS**

### **A. SSL/HTTPS**
- ✅ Vercel: Automatic HTTPS
- ✅ Heroku: Automatic HTTPS
- ✅ Custom domains: SSL certificates included

### **B. Environment Variables**
- ✅ Never commit `.env` files
- ✅ Use platform environment variables
- ✅ Rotate secrets regularly

### **C. CORS Security**
- ✅ Only allow your domain
- ✅ Remove development URLs in production

## 📱 **7. DOMAIN CONFIGURATION**

### **A. DNS Records**
```
# Frontend (Vercel)
A     @     76.76.19.76
CNAME  www   cname.vercel-dns.com

# Backend (Heroku)
CNAME  api   your-heroku-app.herokuapp.com
```

### **B. Email Configuration**
```
# Update email in Footer.jsx
contact@asacoder.xyz

# Set up email forwarding if needed
```

## 🚀 **8. DEPLOYMENT CHECKLIST**

### **Pre-Deployment:**
- [ ] Update all API URLs to production
- [ ] Remove development-specific code
- [ ] Update CORS configuration
- [ ] Set up MongoDB Atlas
- [ ] Configure environment variables
- [ ] Test locally with production settings

### **Frontend (Vercel):**
- [ ] Deploy to Vercel
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Test contact form
- [ ] Verify all links work

### **Backend (Heroku):**
- [ ] Deploy to Heroku
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Test API endpoints
- [ ] Verify database connection

### **Post-Deployment:**
- [ ] Test contact form submission
- [ ] Verify admin panel access
- [ ] Check email functionality
- [ ] Monitor error logs
- [ ] Set up monitoring/analytics

## 🐛 **9. TROUBLESHOOTING**

### **Common Issues:**

1. **CORS Errors:**
   - Check CORS_ORIGIN environment variable
   - Verify domain is in allowed origins

2. **API Connection Issues:**
   - Verify VITE_API_URL is set correctly
   - Check Heroku app is running

3. **Database Connection:**
   - Verify MONGODB_URI is correct
   - Check network access in MongoDB Atlas

4. **Email Issues:**
   - Verify EMAIL_USER and EMAIL_PASS
   - Check app password is correct

## 📞 **10. SUPPORT**

For deployment issues:
- Vercel: Check deployment logs in dashboard
- Heroku: Use `heroku logs --tail`
- MongoDB: Check connection in Atlas dashboard

---

**🎉 Your ASACODER.xyz will be live at:**
- **Frontend:** https://asacoder.xyz
- **Backend API:** https://api.asacoder.xyz
- **Admin Panel:** https://api.asacoder.xyz/admin
