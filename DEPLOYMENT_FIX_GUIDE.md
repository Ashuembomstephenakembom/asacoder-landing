# 🚀 ASACODER.xyz - Deployment Fix Guide

## 🔍 **Issues Identified:**

1. ❌ **Missing Environment Variables** - Frontend can't connect to backend
2. ❌ **Backend Not Accessible** - Heroku app not responding (404 errors)
3. ❌ **CORS Configuration** - May be blocking requests
4. ❌ **Database Connection** - MongoDB not configured

## 🛠️ **Step-by-Step Fix Instructions**

### **Step 1: Get Your Heroku App URL**

First, you need to find your actual Heroku app URL:

```bash
# In your backend directory
cd backend
heroku apps
```

Or check your Heroku dashboard at: https://dashboard.heroku.com/apps

Your URL will be: `https://your-app-name.herokuapp.com`

### **Step 2: Set Frontend Environment Variables (Vercel)**

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your ASACODER project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-app-name.herokuapp.com` (replace with your actual Heroku URL)
   - **Environment**: Production, Preview, Development
5. Click **Save**
6. Go to **Deployments** and redeploy your project

### **Step 3: Configure Backend Environment Variables (Heroku)**

```bash
# Navigate to backend directory
cd backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://asacoder-landing.vercel.app
heroku config:set ADMIN_PASSWORD=your-secure-password-here

# Optional: Set MongoDB URI if you have a database
heroku config:set MONGODB_URI=your-mongodb-connection-string

# Check current config
heroku config
```

### **Step 4: Deploy Backend to Heroku**

```bash
# Make sure you're in the backend directory
cd backend

# Add all changes
git add .

# Commit changes
git commit -m "Update production configuration"

# Deploy to Heroku
git push heroku main

# Check logs for any errors
heroku logs --tail
```

### **Step 5: Test the Connection**

1. **Test Backend Directly:**
   - Visit: `https://your-app-name.herokuapp.com`
   - Should show: `{"message":"ASACODER Landing Page Backend API","database":"MongoDB Connected","timestamp":"..."}`

2. **Test Contact Form:**
   - Visit your Vercel site
   - Try submitting the contact form
   - Check browser console (F12) for any errors

3. **Test Admin Dashboard:**
   - Visit: `https://your-app-name.herokuapp.com/admin`
   - Login with the password you set

### **Step 6: Fix CORS Issues (If Needed)**

If you're still getting CORS errors, update the backend CORS configuration:

**File: `backend/middleware/security.js`**

Make sure your Vercel domain is in the allowed origins list:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://asacoder.xyz',
  'https://www.asacoder.xyz',
  'https://api.asacoder.xyz',
  'https://*.vercel.app', // Allow Vercel preview URLs
  'https://asacoder-landing.vercel.app', // Your specific Vercel domain
  'https://*.ngrok-free.app' // Keep for development
];
```

### **Step 7: Database Setup (Optional)**

If you want to use MongoDB:

1. **Create MongoDB Atlas Database:**
   - Go to: https://www.mongodb.com/atlas
   - Create a free cluster
   - Get your connection string

2. **Set MongoDB URI in Heroku:**
   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/asacoder?retryWrites=true&w=majority
   ```

3. **Redeploy Backend:**
   ```bash
   git push heroku main
   ```

**Note:** The backend will work without MongoDB in "demo mode" - contact forms will be logged but not stored.

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"Backend server is not running"**
   - Check Heroku logs: `heroku logs --tail`
   - Make sure the app is deployed: `heroku ps`

2. **CORS Errors**
   - Verify your Vercel domain is in the allowed origins
   - Check browser console for specific error messages

3. **Environment Variables Not Working**
   - Make sure you redeployed after setting environment variables
   - Check Vercel deployment logs

4. **Contact Form Not Working**
   - Check browser console for network errors
   - Verify the API URL is correct
   - Test the backend endpoint directly

### **Useful Commands:**

```bash
# Check Heroku app status
heroku ps

# View Heroku logs
heroku logs --tail

# Check environment variables
heroku config

# Restart Heroku app
heroku restart

# Check Vercel deployment status
vercel ls
```

## 📞 **Need Help?**

If you're still having issues:

1. Check the browser console (F12) for error messages
2. Check Heroku logs: `heroku logs --tail`
3. Verify all environment variables are set correctly
4. Make sure both frontend and backend are deployed

## ✅ **Success Checklist**

- [ ] Heroku app is running and accessible
- [ ] Vercel environment variable `VITE_API_URL` is set
- [ ] Contact form submits successfully
- [ ] Admin dashboard is accessible
- [ ] No CORS errors in browser console
- [ ] Backend logs show successful connections

---

**Last Updated:** $(date)
**Status:** Ready for deployment fixes
