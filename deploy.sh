#!/bin/bash

# 🚀 E-Commerce Production Deployment Script
# Run this script on your VPS to deploy the latest changes

echo "🚀 Starting E-Commerce Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "server" ]; then
    print_error "Please run this script from the E-Commerce project root directory"
    exit 1
fi

print_status "Pulling latest changes from Git..."
git pull origin main

if [ $? -ne 0 ]; then
    print_error "Failed to pull changes from Git"
    exit 1
fi

print_status "Installing server dependencies..."
cd server
npm install --production
if [ $? -ne 0 ]; then
    print_error "Failed to install server dependencies"
    exit 1
fi

print_status "Installing client dependencies..."
cd ../client
npm install --production
if [ $? -ne 0 ]; then
    print_error "Failed to install client dependencies"
    exit 1
fi

print_status "Installing dashboard dependencies..."
cd ../dashboard
npm install --production
if [ $? -ne 0 ]; then
    print_error "Failed to install dashboard dependencies"
    exit 1
fi

print_status "Running database migrations..."
cd ../server
npx prisma migrate deploy
if [ $? -ne 0 ]; then
    print_error "Failed to run database migrations"
    exit 1
fi

npx prisma generate
if [ $? -ne 0 ]; then
    print_error "Failed to generate Prisma client"
    exit 1
fi

print_status "Building client application..."
cd ../client
npm run build
if [ $? -ne 0 ]; then
    print_error "Failed to build client application"
    exit 1
fi

print_status "Building dashboard application..."
cd ../dashboard
npm run build
if [ $? -ne 0 ]; then
    print_error "Failed to build dashboard application"
    exit 1
fi

print_status "Restarting PM2 processes..."
cd ..
pm2 restart all
if [ $? -ne 0 ]; then
    print_error "Failed to restart PM2 processes"
    exit 1
fi

print_status "Checking PM2 status..."
pm2 status

print_status "🎉 Deployment completed successfully!"
print_status "Your E-Commerce platform is now updated and running!"

echo ""
echo "🌐 Access your applications:"
echo "   Client Store: https://your-domain.com"
echo "   Admin Dashboard: https://admin.your-domain.com"
echo "   API Server: https://api.your-domain.com"
echo ""
echo "📊 Monitor your applications:"
echo "   PM2 Status: pm2 status"
echo "   PM2 Logs: pm2 logs"
echo "   PM2 Monitor: pm2 monit"
