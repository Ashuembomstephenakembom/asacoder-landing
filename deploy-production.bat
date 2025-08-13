@echo off
REM 🚀 ASACODER.xyz Production Deployment Script for Windows
REM This script helps you deploy your landing page to production

echo 🚀 Starting ASACODER.xyz Production Deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] Please run this script from the project root directory
    pause
    exit /b 1
)

echo [INFO] Checking prerequisites...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [SUCCESS] Prerequisites check passed

REM Step 1: Install dependencies
echo [INFO] Installing dependencies...
call npm run setup
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Step 2: Build frontend
echo [INFO] Building frontend for production...
cd frontend
call npm run build
if errorlevel 1 (
    echo [ERROR] Failed to build frontend
    pause
    exit /b 1
)
echo [SUCCESS] Frontend built successfully
cd ..

echo [INFO] Production build completed successfully!
echo.
echo [INFO] Next steps:
echo.
echo 🌐 FRONTEND (Vercel):
echo    1. Go to https://vercel.com
echo    2. Import your GitHub repository
echo    3. Set Root Directory: landing-pages/asacoder-landing/frontend
echo    4. Set Environment Variable: VITE_API_URL=https://api.asacoder.xyz
echo    5. Deploy and add custom domain: asacoder.xyz
echo.
echo ☁️  BACKEND (Heroku):
echo    1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
echo    2. Run: heroku login
echo    3. Run: cd backend ^&^& heroku create asacoder-api
echo    4. Set environment variables (see env.production.example)
echo    5. Run: git push heroku main
echo    6. Add custom domain: heroku domains:add api.asacoder.xyz
echo.
echo 🗄️  DATABASE (MongoDB Atlas):
echo    1. Create free cluster at https://mongodb.com/atlas
echo    2. Set up database user and get connection string
echo    3. Add to Heroku environment variables
echo.
echo [WARNING] IMPORTANT: Update your DNS records as instructed by Vercel and Heroku
echo.
echo [SUCCESS] Your ASACODER.xyz will be live at:
echo    Frontend: https://asacoder.xyz
echo    Backend: https://api.asacoder.xyz
echo    Admin: https://api.asacoder.xyz/admin
echo.
pause
