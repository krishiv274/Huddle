# 🚀 Huddle - Real-Time Chat Application

<div align="center">
  <img src="client/src/assets/huddle.png" alt="Huddle Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black.svg)](https://socket.io/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.4-blue.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

## 📋 Overview

**Huddle** is a modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io. It offers a sleek, responsive design with real-time messaging, online user tracking, media sharing, and a beautiful glassmorphism UI.

### ✨ Key Features

- 🔐 **Secure Authentication** - JWT-based login/signup system
- 💬 **Real-Time Messaging** - Instant messaging with Socket.io
- 👥 **Online Status** - See who's online in real-time
- 📸 **Media Sharing** - Share images seamlessly
- 🎨 **Modern UI/UX** - Glassmorphism design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔔 **Message Notifications** - Unread message counters
- 👤 **Profile Management** - Update profile pictures and bio
- 🔍 **User Search** - Find users quickly with search functionality

---

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - Modern UI library
- **TailwindCSS 4.1.4** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **Socket.io 4.8.1** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Media storage and optimization
- **CORS** - Cross-origin resource sharing

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krishiv274/Huddle.git
   cd Huddle
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   PORT=5002
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Create `.env` file in the `client` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5002
   ```

5. **Start the application**
   
   Terminal 1 - Start the server:
   ```bash
   cd server
   npm run server
   ```
   
   Terminal 2 - Start the client:
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📱 Features Walkthrough

### 🔑 Authentication System
- **Sign Up**: Create account with email, full name, and bio
- **Login**: Secure login with JWT token authentication
- **Password Security**: Bcrypt hashing for password protection

### 💬 Real-Time Chat
- **Instant Messaging**: Send and receive messages in real-time
- **Message Status**: See if messages are delivered and seen
- **Typing Indicators**: Know when someone is typing
- **Message History**: Access previous conversations

### 👥 User Management
- **Online Status**: Green indicator for online users
- **User Search**: Find users by name with search functionality
- **Profile Pictures**: Upload and display custom avatars
- **User Profiles**: View user bio and information

### 📸 Media Features
- **Image Sharing**: Upload and share images instantly
- **Media Gallery**: View all shared media in conversations
- **Image Preview**: Click to view images in full size
- **Cloudinary Integration**: Optimized image storage and delivery

### 🎨 UI/UX Features
- **Glassmorphism Design**: Modern glass-like interface
- **Smooth Animations**: Fluid transitions and hover effects
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with dark mode aesthetics
- **Custom Scrollbars**: Stylized scroll bars for better UX

---

## 📁 Project Structure

```
Huddle/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # Reusable components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   └── RightSidebar.jsx
│   │   ├── context/       # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │   ├── pages/         # Main pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── lib/           # Utility functions
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   │   ├── userController.js
│   │   └── messageController.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── models/           # Database models
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/           # API routes
│   │   ├── userRoutes.js
│   │   └── messageRoutes.js
│   ├── lib/              # Utility functions
│   │   ├── db.js
│   │   ├── utils.js
│   │   └── cloudinary.js
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

---

## 🔗 API Endpoints

### Authentication Routes
```
POST /api/auth/signup     # User registration
POST /api/auth/login      # User login
GET  /api/auth/check      # Check authentication
PUT  /api/auth/update-profile # Update user profile
```

### Message Routes
```
GET  /api/messages/users         # Get all users for sidebar
GET  /api/messages/:id           # Get messages with specific user
POST /api/messages/send/:id      # Send message to user
PUT  /api/messages/mark/:id      # Mark message as seen
```

---

## 🌟 Screenshots

### Login Page
Beautiful animated login interface with glassmorphism design.

### Main Chat Interface
Three-panel layout with user list, chat area, and user profile.

### Profile Management
Easy profile editing with image upload functionality.

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel/Heroku)
1. Create production environment variables
2. Update CORS settings for production URL
3. Deploy using platform-specific instructions

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses
3. Update connection string in environment variables

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Krishiv**
- GitHub: [@krishiv274](https://github.com/krishiv274)
- Email: krishiv270406@gmail.com

---

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Socket.io for real-time communication
- TailwindCSS for the amazing utility-first approach
- Cloudinary for image management
- MongoDB for the flexible database solution

---

## 📧 Support

If you have any questions or need support, please:
1. Check the [Issues](https://github.com/krishiv274/Huddle/issues) page
2. Create a new issue if your question isn't answered
3. Contact the author directly

---

<div align="center">
  <h3>⭐ If you found this project helpful, please give it a star! ⭐</h3>
  
  Made with ❤️ by [Krishiv](https://github.com/krishiv274)
</div>
