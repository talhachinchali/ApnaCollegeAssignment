#!/bin/bash

# Quick Start Script for DSA Sheet Application
# This script sets up the development environment quickly

set -e

echo "🚀 DSA Sheet Application - Quick Start"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null && ! docker ps | grep -q mongo; then
    print_warning "MongoDB is not running. Starting MongoDB with Docker..."
    docker run -d -p 27017:27017 --name dsa-sheet-mongodb mongo:7 || print_warning "Docker not available or MongoDB container already exists"
fi

# Install dependencies
print_status "Installing dependencies..."

# Root dependencies
if [ -f "package.json" ]; then
    npm install
fi

# Server dependencies
if [ -d "server" ]; then
    print_status "Installing server dependencies..."
    cd server
    npm install
    cd ..
fi

# Client dependencies
if [ -d "client" ]; then
    print_status "Installing client dependencies..."
    cd client
    npm install
    cd ..
fi

# Create environment file if it doesn't exist
if [ ! -f "server/.env" ]; then
    print_status "Creating environment file..."
    cat > server/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-sheet
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
EOF
fi

# Wait for MongoDB to be ready
print_status "Waiting for MongoDB to be ready..."
sleep 5

# Seed the database
if [ -d "server" ]; then
    print_status "Seeding the database..."
    cd server
    npm run seed
    cd ..
fi

print_status "Setup completed successfully!"
echo ""
print_status "To start the application:"
echo "  1. Start the backend: cd server && npm run dev"
echo "  2. Start the frontend: cd client && npm run dev"
echo "  3. Or run both: npm run dev"
echo ""
print_status "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:5000"
echo ""
print_status "Default test account:"
echo "  Email: test@example.com"
echo "  Password: password123"
echo ""
print_status "Happy coding! 🎉"
