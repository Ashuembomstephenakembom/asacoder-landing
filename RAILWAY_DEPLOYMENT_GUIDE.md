# 🚂 Railway Deployment Guide for ASACODER Backend

## 🎯 **Overview**
This guide will help you deploy your ASACODER backend to Railway, a modern hosting platform that's perfect for Node.js applications.

## 📋 **Prerequisites**
- [Railway Account](https://railway.app/) (Free tier available)
- GitHub repository with your backend code
- Node.js project ready for deployment

## 🚀 **Step 1: Prepare Your Repository**

### 1.1 Verify Backend Structure
Your backend should have this structure:
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── railway.json           # Railway configuration
├── middleware/            # Security and validation middleware
├── routes/               # API routes
├── controllers/          # Business logic
├── models/              # Database models (if using MongoDB)
└── config/              # Configuration files
```

### 1.2 Check package.json
Ensure your `package.json` has:
```json
{
  "name": "asacoder-landing-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🚂 **Step 2: Deploy to Railway**

### 2.1 Connect to Railway
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `asacoder-landing`
5. Select the **backend** directory as the source

### 2.2 Configure Build Settings
Railway will automatically detect your Node.js project. The `railway.json` file will handle the configuration.

### 2.3 Set Environment Variables
In your Railway project dashboard, go to **Variables** tab and add:

```bash
# Required Variables
NODE_ENV=production
CORS_ORIGIN=https://asacoder-landing.vercel.app,https://asacoder.xyz,https://www.asacoder.xyz
ADMIN_PASSWORD=your-secure-password-here

# Optional Variables (for enhanced functionality)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/asacoder?retryWrites=true&w=majority
# JWT_SECRET=your-jwt-secret-key
```

### 2.4 Deploy
1. Railway will automatically start building and deploying
2. Monitor the build logs for any errors
3. Once deployed, Railway will provide your app URL

## 🔧 **Step 3: Configure Frontend**

### 3.1 Update Vercel Environment Variables
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your ASACODER project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-app-url.railway.app` (replace with your actual Railway URL)
   - **Environment**: Production, Preview, Development
5. Click **Save**
6. Redeploy your Vercel project

### 3.2 Update Frontend Code
Update these files with your Railway URL:

**`frontend/src/components/Contact.jsx`:**
```javascript
// Replace this line:
backendUrl = 'https://your-new-backend-url.com'
// With your Railway URL:
backendUrl = 'https://your-railway-app-url.railway.app'
```

**`frontend/src/components/AdminPanel.jsx`:**
```javascript
// Replace this line:
backendUrl = 'https://your-new-backend-url.com'
// With your Railway URL:
backendUrl = 'https://your-railway-app-url.railway.app'
```

## 🧪 **Step 4: Test Your Deployment**

### 4.1 Test Backend Directly
Visit your Railway URL: `https://your-railway-app-url.railway.app`
You should see:
```json
{
  "message": "ASACODER Landing Page Backend API",
  "database": "MongoDB Connected",
  "timestamp": "2025-01-27T..."
}
```

### 4.2 Test API Endpoints
- **Health Check**: `GET /`
- **Contact Form**: `POST /api/contact/submit`
- **Admin Panel**: `GET /admin`

### 4.3 Test Frontend Integration
1. Visit your Vercel site
2. Try submitting the contact form
3. Check browser console (F12) for any errors
4. Verify the form submission works

## 🔍 **Step 5: Monitor and Debug**

### 5.1 Railway Logs
- Go to your Railway project dashboard
- Click on your service
- Go to **Deployments** tab
- Click on the latest deployment to view logs

### 5.2 Common Issues and Solutions

**Issue: Build Fails**
- Check that `package.json` has correct dependencies
- Verify `server.js` is the main entry point
- Check Railway build logs for specific errors

**Issue: App Won't Start**
- Verify `NODE_ENV=production` is set
- Check that port is correctly configured (Railway sets `PORT` automatically)
- Review application logs for startup errors

**Issue: CORS Errors**
- Verify `CORS_ORIGIN` includes your Vercel domain
- Check that the frontend URL is correct in environment variables

**Issue: Contact Form Not Working**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that the Railway URL is accessible
- Test the API endpoint directly

## 📊 **Step 6: Performance Optimization**

### 6.1 Railway Settings
- **Auto-Deploy**: Enable for automatic deployments on git push
- **Health Checks**: Railway will monitor your app health
- **Scaling**: Railway can auto-scale based on traffic

### 6.2 Environment Variables for Production
```bash
# Performance
NODE_ENV=production
PORT=3000

# Security
CORS_ORIGIN=https://asacoder-landing.vercel.app,https://asacoder.xyz,https://www.asacoder.xyz
ADMIN_PASSWORD=your-secure-password-here

# Database (Optional)
MONGODB_URI=your-mongodb-connection-string

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔐 **Step 7: Security Considerations**

### 7.1 Environment Variables
- Never commit sensitive data to git
- Use Railway's secure environment variable storage
- Rotate passwords and secrets regularly

### 7.2 CORS Configuration
- Only allow necessary origins
- Use HTTPS for all production URLs
- Regularly review and update allowed origins

### 7.3 Rate Limiting
- The backend includes rate limiting by default
- Monitor for abuse and adjust limits as needed
- Consider implementing additional security measures

## 📈 **Step 8: Monitoring and Maintenance**

### 8.1 Railway Monitoring
- **Metrics**: Monitor CPU, memory, and network usage
- **Logs**: Review application logs regularly
- **Deployments**: Track deployment success/failure rates

### 8.2 Health Checks
Railway will automatically check your app health at the `/` endpoint.

### 8.3 Updates and Maintenance
- Keep dependencies updated
- Monitor for security vulnerabilities
- Regularly review and update environment variables

## ✅ **Success Checklist**

- [ ] Backend deployed to Railway successfully
- [ ] Environment variables configured correctly
- [ ] Frontend updated with Railway URL
- [ ] Contact form working properly
- [ ] Admin panel accessible
- [ ] No CORS errors in browser console
- [ ] Health checks passing
- [ ] Logs showing successful connections

## 🆘 **Troubleshooting**

### Railway-Specific Commands
```bash
# Install Railway CLI (optional)
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# View logs
railway logs

# Check status
railway status
```

### Common Railway Issues
1. **Build Timeout**: Increase build timeout in railway.json
2. **Memory Issues**: Optimize your Node.js application
3. **Port Issues**: Railway sets PORT automatically, don't hardcode it
4. **Environment Variables**: Double-check all variables are set correctly

## 📞 **Support**

If you encounter issues:
1. Check Railway documentation: https://docs.railway.app/
2. Review Railway community forums
3. Check your application logs for specific error messages
4. Verify all environment variables are set correctly

---

**Last Updated:** January 2025
**Status:** Ready for Railway deployment
