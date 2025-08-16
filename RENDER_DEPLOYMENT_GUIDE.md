# Render Deployment Guide for ASACODER Backend

## Overview
This guide will help you deploy your ASACODER backend to Render.com for production hosting.

## Prerequisites
- Render.com account
- MongoDB Atlas database (or other MongoDB provider)
- Gmail account with App Password for email functionality

## Step 1: Prepare Your Repository

### 1.1 Ensure your backend is ready
- ✅ Backend code is in the `backend/` directory
- ✅ `package.json` has correct scripts
- ✅ `server.js` uses `process.env.PORT`
- ✅ `render.yaml` configuration file is present

### 1.2 Environment Variables Setup
You'll need to set these environment variables in Render dashboard:

#### Required Variables:
```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://asacoder.xyz
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/asacoder?retryWrites=true&w=majority
EMAIL_USER=stephen@asaofficial.org
EMAIL_PASS=your-gmail-app-password
ADMIN_PASSWORD=your-secure-admin-password
JWT_SECRET=your-super-secure-jwt-secret-key
```

#### Optional Variables:
```
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
SENTRY_DSN=your-sentry-dsn-if-using
```

## Step 2: Deploy to Render

### 2.1 Connect Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your ASACODER project

### 2.2 Configure Service
- **Name**: `asacoder-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.3 Set Environment Variables
In the Render dashboard, go to your service → Environment → Add Environment Variable:

1. **NODE_ENV**: `production`
2. **PORT**: `10000`
3. **CORS_ORIGIN**: `https://asacoder.xyz`
4. **MONGODB_URI**: Your MongoDB connection string
5. **EMAIL_USER**: `stephen@asaofficial.org`
6. **EMAIL_PASS**: Your Gmail App Password
7. **ADMIN_PASSWORD**: Secure admin password
8. **JWT_SECRET**: Long, random string for JWT signing

### 2.4 Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your service
3. Wait for deployment to complete (usually 2-5 minutes)

## Step 3: Verify Deployment

### 3.1 Check Service Status
- Go to your service dashboard
- Ensure status shows "Live"
- Check logs for any errors

### 3.2 Test Endpoints
Your backend will be available at: `https://your-service-name.onrender.com`

Test these endpoints:
- `GET /` - Should return API info
- `POST /api/contact/submit` - Contact form endpoint
- `GET /admin` - Admin dashboard

### 3.3 Update Frontend Configuration
Update your frontend's API URL to point to your Render backend:

```javascript
// In your frontend environment variables or config
VITE_API_URL=https://your-service-name.onrender.com
```

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Custom Domain
1. Go to your service → Settings → Custom Domains
2. Add your domain (e.g., `api.asacoder.xyz`)
3. Configure DNS records as instructed by Render

### 4.2 Update CORS
If using custom domain, update `CORS_ORIGIN` environment variable:
```
CORS_ORIGIN=https://asacoder.xyz
```

## Step 5: Monitor and Maintain

### 5.1 Monitor Logs
- Check Render logs regularly
- Set up log monitoring if needed

### 5.2 Performance
- Monitor response times
- Check for any rate limiting issues
- Optimize database queries if needed

### 5.3 Security
- Regularly rotate JWT secrets
- Monitor for suspicious activity
- Keep dependencies updated

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check `package.json` scripts
   - Verify all dependencies are in `dependencies` (not `devDependencies`)
   - Check for syntax errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify MongoDB connection string format

3. **CORS Issues**
   - Verify `CORS_ORIGIN` is set correctly
   - Check frontend is using correct backend URL

4. **Email Not Working**
   - Verify Gmail App Password is correct
   - Check email credentials in environment variables
   - Test email configuration

### Support
- Render Documentation: https://render.com/docs
- Render Support: https://render.com/support

## Next Steps

After successful backend deployment:
1. Deploy frontend to your preferred platform (Vercel, Netlify, etc.)
2. Update frontend API URL to point to Render backend
3. Test complete contact form functionality
4. Set up monitoring and alerts
5. Configure backups for MongoDB database

---

**Note**: Keep your environment variables secure and never commit them to version control. Always use Render's environment variable system for sensitive data.
