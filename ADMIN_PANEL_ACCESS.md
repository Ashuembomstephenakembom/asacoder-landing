# Admin Panel Access Guide

## 🚀 How to Access Your Admin Panel

### **Admin Panel URL:**
- **Production**: `https://asacoder.xyz/admin`
- **Alternative**: `https://asacoder-landing.vercel.app/admin` (if using Vercel default domain)
- **Local Development**: `http://localhost:5173/admin` (or `http://localhost:3000/admin` if using port 3000)

### **Admin Password:**
- Password: `asacoder2025`

---

## 💻 Development Setup

### **Step 1: Start the Frontend Development Server**

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend will typically start on `http://localhost:5173` (Vite default port).

### **Step 2: Start the Backend Server**

In a **separate terminal window**:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Start the backend server
npm run dev
# OR
npm start
```

The backend will start on `http://localhost:10000` (as configured in your code).

### **Step 3: Access the Admin Panel**

1. Make sure both frontend and backend servers are running
2. Open your browser and go to: `http://localhost:5173/admin`
3. Enter the password: `asacoder2025`
4. You should now see the admin panel!

### **Development URLs:**
- **Frontend**: `http://localhost:5173` (or check the terminal output for the actual port)
- **Backend API**: `http://localhost:10000`
- **Admin Panel**: `http://localhost:5173/admin`

### **Troubleshooting Development Access:**

**If the admin panel doesn't load:**
1. ✅ Make sure the frontend dev server is running (`npm run dev` in `frontend/` folder)
2. ✅ Make sure the backend server is running (`npm run dev` or `npm start` in `backend/` folder)
3. ✅ Check the browser console for errors
4. ✅ Verify you're using the correct URL: `http://localhost:5173/admin` (not `/admin` alone)
5. ✅ Try clearing browser cache or using incognito mode

**If you see "Cannot connect to backend":**
- The admin panel will show demo data if the backend isn't connected
- Make sure the backend is running on port 10000
- Check that `http://localhost:10000` is accessible in your browser

---

## 📋 What the Admin Panel Does

The admin panel allows you to:
- ✅ View all contact form submissions
- ✅ See message statistics (total, new, read, replied)
- ✅ Mark messages as read/replied
- ✅ Reply to messages via email
- ✅ Delete messages
- ✅ Search and filter messages

---

## 🔍 Why You Can't See Messages

### **Issue 1: Direct Emails vs Contact Form Messages**

**Direct Emails** (stephen@asaofficial.org):
- ✅ These work because they go directly to your Zoho email account
- ✅ You receive them on your phone via Zoho

**Contact Form Messages**:
- ❌ These are stored in **MongoDB database**
- ❌ You can ONLY see them in the admin panel
- ❌ They are NOT automatically sent to your email

### **Issue 2: MongoDB Connection**

If you can't see messages in the admin panel, it's likely because:
1. **MongoDB is not connected** in production
2. **MongoDB connection string** is missing or incorrect
3. **Backend is running in demo mode** (showing fake demo data)

---

## 🛠️ Troubleshooting Steps

### **Step 1: Access the Admin Panel**

1. Go to your production website: `https://asacoder.xyz`
2. Add `/admin` to the URL: `https://asacoder.xyz/admin`

3. Enter password: `asacoder2025`

### **Step 2: Check if MongoDB is Connected**

**In the Admin Panel:**
- If you see **demo messages** (John Doe, Jane Smith), MongoDB is NOT connected
- If you see **real messages** from users, MongoDB IS connected

**Check Backend Logs:**
- Look for: `✅ Database connection successful`
- Or: `⚠️ Running in demo mode without database`

### **Step 3: Verify Environment Variables**

**On Render (Backend):**
Make sure these are set in your Render dashboard:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `EMAIL_USER` - stephen@asaofficial.org
- `EMAIL_PASS` - Your Zoho email password/app password

**On Vercel (Frontend):**
Make sure this is set:
- `VITE_API_URL` - https://asacoder-backend.onrender.com

---

## 📧 How Messages Work

### **Contact Form Flow:**
1. User fills out contact form on your website
2. Form submits to: `https://asacoder-backend.onrender.com/api/contact/submit`
3. Backend saves message to **MongoDB**
4. User sees "Message sent successfully"
5. **You view the message in the admin panel** (NOT in your email)

### **Direct Email Flow:**
1. User sends email to: stephen@asaofficial.org
2. Email goes directly to your **Zoho email account**
3. You receive it on your phone/email client
4. **This is separate from the contact form**

---

## 🔧 Fix MongoDB Connection

### **Option 1: Set Up MongoDB Atlas (Recommended)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to Render as `MONGODB_URI`

### **Option 2: Check Current Connection**

1. Go to Render dashboard
2. Check your backend service logs
3. Look for MongoDB connection errors
4. Verify `MONGODB_URI` environment variable is set

---

## 📱 Quick Access Links

- **Admin Panel**: `https://asacoder.xyz/admin`
- **Backend API**: `https://asacoder-backend.onrender.com`
- **Backend Health Check**: `https://asacoder-backend.onrender.com/`

---

## 🆘 Still Can't Access?

1. **Check your production URL** - What domain is your site deployed on?
2. **Check backend logs** - Is the backend running?
3. **Check MongoDB** - Is it connected?
4. **Try the password** - Make sure you're using: `asacoder2025`

---

## 📝 Summary

- ✅ **Admin Panel Route**: `/admin`
- ✅ **Password**: `asacoder2025`
- ✅ **Backend URL**: `https://asacoder-backend.onrender.com`
- ⚠️ **Contact form messages** go to MongoDB (admin panel)
- ⚠️ **Direct emails** go to your Zoho account (phone)
- ⚠️ **They are separate systems!**

---

**Need Help?** Check the backend logs on Render to see if MongoDB is connected.

