# ASACODER Landing Page

A modern, responsive landing page for ASACODER with contact form functionality and admin panel.

## 🚀 Live Demo

- **Frontend**: https://asacoder.xyz
- **Backend API**: https://api.asacoder.xyz

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** (MongoDB Atlas)
- **Nodemailer** for email functionality
- **JWT** for authentication
- **Helmet** for security headers

## 📁 Project Structure

```
asacoder-landing/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── assets/         # Images and static files
│   │   └── App.jsx         # Main app component
│   ├── public/             # Public assets
│   ├── vercel.json         # Vercel configuration
│   └── vite.config.js      # Vite configuration
├── backend/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── middleware/         # Security middleware
│   ├── models/             # MongoDB models
│   ├── controllers/        # Route controllers
│   ├── config/             # Database configuration
│   ├── utils/              # Utility functions
│   ├── Procfile            # Heroku configuration
│   └── server.js           # Main server file
├── PRODUCTION_DEPLOYMENT_GUIDE.md  # Complete deployment guide
├── deploy-production.sh    # Linux/Mac deployment script
├── deploy-production.bat   # Windows deployment script
└── README.md               # This file
```

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Vercel account (for frontend)
- Heroku account (for backend)
- Domain: `asacoder.xyz`

### 1. Local Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd asacoder-landing

# Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 2. Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=https://api.asacoder.xyz
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://asacoder.xyz
MONGODB_URI=your-mongodb-atlas-connection-string
EMAIL_USER=contact@asacoder.xyz
EMAIL_PASS=your-gmail-app-password
ADMIN_PASSWORD=your-secure-admin-password
JWT_SECRET=your-super-secure-jwt-secret
```

### 3. Deploy to Production

#### Option A: Automated Scripts
```bash
# Linux/Mac
./deploy-production.sh

# Windows
deploy-production.bat
```

#### Option B: Manual Deployment

**Frontend (Vercel):**
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

**Backend (Heroku):**
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Heroku CLI or GitHub integration

## 📋 Features

- ✅ Responsive design (mobile-first)
- ✅ Contact form with email notifications
- ✅ Admin panel for message management
- ✅ Security headers and CORS protection
- ✅ Rate limiting and input validation
- ✅ MongoDB integration
- ✅ Production-ready build optimization
- ✅ Custom domain support

## 🔧 Development

```bash
# Start frontend (development)
cd frontend
npm run dev

# Start backend (development)
cd backend
npm run dev
```

## 📚 Documentation

For detailed deployment instructions, see [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)

## 🔒 Security

- CORS protection
- Rate limiting
- Input validation
- Security headers
- JWT authentication
- MongoDB injection protection

## 📞 Support

- **Email**: contact@asacoder.xyz
- **Website**: https://asacoder.xyz

## 📄 License

This project is private and proprietary to ASACODER.
