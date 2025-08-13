#!/bin/bash

# 🚀 ASACODER.xyz Production Deployment Script
# This script helps you deploy your landing page to production

echo "🚀 Starting ASACODER.xyz Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "Prerequisites check passed"

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm run setup
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 2: Build frontend
print_status "Building frontend for production..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
    print_success "Frontend built successfully"
else
    print_error "Failed to build frontend"
    exit 1
fi
cd ..

# Step 3: Test backend locally
print_status "Testing backend locally..."
cd backend
npm run dev &
BACKEND_PID=$!
sleep 5

# Test backend connection
curl -s http://localhost:5000/ > /dev/null
if [ $? -eq 0 ]; then
    print_success "Backend is running and accessible"
else
    print_warning "Backend test failed - make sure it's running on port 5000"
fi

# Stop backend
kill $BACKEND_PID 2>/dev/null
cd ..

print_status "Production build completed successfully!"
echo ""
print_status "Next steps:"
echo ""
echo "🌐 FRONTEND (Vercel):"
echo "   1. Go to https://vercel.com"
echo "   2. Import your GitHub repository"
echo "   3. Set Root Directory: landing-pages/asacoder-landing/frontend"
echo "   4. Set Environment Variable: VITE_API_URL=https://api.asacoder.xyz"
echo "   5. Deploy and add custom domain: asacoder.xyz"
echo ""
echo "☁️  BACKEND (Heroku):"
echo "   1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
echo "   2. Run: heroku login"
echo "   3. Run: cd backend && heroku create asacoder-api"
echo "   4. Set environment variables (see env.production.example)"
echo "   5. Run: git push heroku main"
echo "   6. Add custom domain: heroku domains:add api.asacoder.xyz"
echo ""
echo "🗄️  DATABASE (MongoDB Atlas):"
echo "   1. Create free cluster at https://mongodb.com/atlas"
echo "   2. Set up database user and get connection string"
echo "   3. Add to Heroku environment variables"
echo ""
print_warning "IMPORTANT: Update your DNS records as instructed by Vercel and Heroku"
echo ""
print_success "Your ASACODER.xyz will be live at:"
echo "   Frontend: https://asacoder.xyz"
echo "   Backend: https://api.asacoder.xyz"
echo "   Admin: https://api.asacoder.xyz/admin"
