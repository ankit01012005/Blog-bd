# Blog API

A simple blog backend API that allows users to create, read, like, and comment on blog posts with JWT authentication.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) + Cookies
- **Password Hashing**: bcryptjs
- **Environment**: dotenv for configuration

## Authentication

### How It Works
- Users sign up and get a JWT token stored in **httpOnly cookies**
- Token is required for protected routes (create blog, comment, like posts)
- Token expires in 24 hours
- Logout clears the cookie

### Key Features
- **bcryptjs**: Passwords are hashed with salt (10 rounds) before storing in DB
- **JWT**: Tokens signed with `JWT_SECRET` (must be in .env)
- **httpOnly Cookies**: Secure token storage (prevents XSS attacks)
- **Token Verification**: Middleware checks token on every protected request

## Core Features

- **Create Blog Posts** - Create new blog posts with title and content (Protected)
- **Get All Blogs** - Retrieve all blog posts from the database
- **Like Posts** - Users can like blog posts (Protected)
- **Unlike Posts** - Users can remove likes from posts (Protected)
- **Comments** - Add comments to blog posts (Protected)

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Authentication Routes (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login user & get token |
| POST | `/auth/logout` | Logout & clear cookie |

### Blog Routes
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/post/create` | ✅ | Create a new blog post |
| GET | `/post/getAll` | ❌ | Get all blog posts |
| POST | `/comment/create` | ✅ | Add a comment to a post |
| POST | `/likes/like` | ✅ | Like a blog post |
| POST | `/likes/unlike` | ✅ | Unlike a blog post |

## Project Structure

```
blog-bd/
├── config/       → Database configuration
├── controllers/  → Business logic (auth, blogs, comments, likes)
├── middleware/   → Auth middleware for route protection
├── model/        → MongoDB schemas (User, Blog, Comment, Like)
├── routes/       → API route definitions
├── server.js     → Express app setup & entry point
└── package.json  → Dependencies & scripts
```

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file with:
DATABASE_URL=your_mongodb_url
PORT=4000
JWT_SECRET=your_secret_key_here

# Run in development mode
npm run dev

# Run in production
npm start
```

## Authentication Flow

### Signup
```json
POST /api/v1/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token (also set in cookie)

### Protected Route
```
GET /api/v1/post/getAll
Headers: { Authorization: "Bearer <token>" }
// or token is automatically sent from cookie
```

## Database Schema

- **User** - name, email, password (hashed), createdAt
- **Blog** - title, content, likes array, comments array
- **Comment** - post (ref), user, body
- **Like** - Tracks likes on blog posts

