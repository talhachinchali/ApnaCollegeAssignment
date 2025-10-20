# DSA Sheet Web Application

A comprehensive Data Structures and Algorithms practice platform built with modern web technologies. This application helps students track their progress through a structured DSA curriculum with integrated learning resources.

## 🚀 Features

- 🔐 **Secure Authentication**: JWT-based login/register system
- 📚 **Structured Learning**: Organized DSA topics with progressive difficulty
- 🎥 **Video Tutorials**: YouTube links for each problem
- 🔗 **Practice Platforms**: Direct links to LeetCode and Codeforces
- 📖 **Theory Resources**: Article links for comprehensive understanding
- 🎯 **Difficulty Levels**: Easy/Medium/Hard categorization
- ✅ **Progress Tracking**: Persistent checkboxes with completion status
- 📊 **Analytics**: Progress statistics and completion percentages
- 🎨 **Modern UI**: Beautiful, responsive design with animations

## 🛠 Tech Stack

### Frontend
- **Framework**: Vite + React 18
- **Routing**: TanStack Router v1
- **State Management**: TanStack Query (React Query)
- **UI Components**: shadcn/ui + TailwindCSS
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

### Deployment
- **Containerization**: Docker + Docker Compose
- **Cloud Platform**: AWS EC2
- **Database**: MongoDB Atlas (production)

## 📁 Project Structure

```
dsa-sheet/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── pages/          # Page components
│   │   │   ├── login/      # Authentication pages
│   │   │   ├── dashboard/ # Main dashboard
│   │   │   └── topic/      # Topic detail pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── App.tsx         # Main app component
│   ├── Dockerfile          # Frontend container
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   └── app.js          # Main server file
│   ├── Dockerfile          # Backend container
│   └── package.json
├── docker-compose.yml      # Multi-container setup
├── deploy-aws.sh          # AWS deployment script
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa-sheet
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dsa-sheet
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7
   
   # Or start your local MongoDB service
   ```

5. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   # From root directory
   npm run dev
   
   # Or start individually:
   # Terminal 1: Backend
   cd server && npm run dev
   
   # Terminal 2: Frontend
   cd client && npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Deployment

1. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

2. **Seed the database**
   ```bash
   docker-compose exec backend npm run seed
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

## 🌐 AWS Deployment

### Prerequisites
- AWS CLI configured
- EC2 key pair created
- Docker installed locally

### Deploy to AWS

1. **Make the deployment script executable**
   ```bash
   chmod +x deploy-aws.sh
   ```

2. **Run the deployment script**
   ```bash
   ./deploy-aws.sh
   ```

3. **Access your deployed application**
   - The script will output the public IP
   - Access via: `http://<PUBLIC_IP>`

### Manual AWS Setup

1. **Launch EC2 instance** (t3.medium or larger)
2. **Install Docker and Docker Compose**
3. **Upload application files**
4. **Configure environment variables**
5. **Start the application**

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Topics
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get specific topic

### Progress
- `GET /api/progress` - Get user progress
- `GET /api/progress/topic/:topicId` - Get topic progress
- `POST /api/progress/update` - Update problem progress
- `GET /api/progress/stats` - Get progress statistics

## 🎯 Usage Guide

1. **Register/Login**: Create an account or sign in
2. **Browse Topics**: View available DSA topics on the dashboard
3. **Start Learning**: Click on a topic to see problems
4. **Track Progress**: Check off completed problems
5. **Access Resources**: Use provided links for tutorials and practice
6. **Monitor Progress**: View completion statistics

## 🔧 Configuration

### Environment Variables

**Server (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-sheet
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### Database Schema

**User Model**
- username, email, password
- Created timestamp

**Topic Model**
- title, description, order
- Array of problems

**Problem Model**
- title, description, difficulty
- Links: YouTube, LeetCode, Codeforces, Articles
- Order within topic

**Progress Model**
- userId, topicId, problemId
- completed status and timestamp

## 🚀 Production Considerations

1. **Security**
   - Change JWT secret
   - Use HTTPS
   - Implement rate limiting
   - Validate all inputs

2. **Database**
   - Use MongoDB Atlas for production
   - Set up proper indexes
   - Configure backups

3. **Performance**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching strategies

4. **Monitoring**
   - Set up logging
   - Monitor application metrics
   - Configure alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎉 Acknowledgments

- Built with modern web technologies
- Inspired by popular DSA practice platforms
- Designed for educational purposes

---

**Happy Coding! 🚀**
