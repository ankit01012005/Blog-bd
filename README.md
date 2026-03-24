# Blog API

A simple blog backend API that allows users to create, read, like, and comment on blog posts with JWT authentication, input validation, and comprehensive error handling.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) + Cookies
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv for configuration

## Key Features

### Security & Validation
- 🔐 Passwords hashed with bcryptjs (salt rounds: 10)
- ✅ Input validation on all endpoints (express-validator)
- 🍪 JWT tokens stored in **httpOnly cookies** (prevents XSS)
- ⏱️ Tokens expire in 24 hours
- 🛡️ Protected routes check token automatically
- 📊 Proper HTTP status codes (201, 400, 401, 404, 409, 500)
- 🎯 Try-catch on all async operations

### Core Features
- **Create Blog Posts** - Create posts with title & content (Protected)
- **Get All Blogs** - Retrieve all posts with comments & likes
- **Like Posts** - Users can like posts (Protected)
- **Unlike Posts** - Remove likes from posts (Protected)
- **Comments** - Add comments to posts (Protected)

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file with:
DATABASE_URL=your_mongodb_url
PORT=4000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development

# Run in development mode
npm run dev

# Run in production
npm start
```

---

## API Documentation

All endpoints are prefixed with `/api/v1`

### Authentication Routes

#### 1. Signup (Create Account)
```
POST /api/v1/auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-24T10:30:00.000Z"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "Name must be at least 2 characters" },
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

**Email Already Exists (409):**
```json
{
  "success": false,
  "message": "Email already registered."
}
```

#### 2. Login (Get Token)
```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Invalid Credentials (401):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

#### 3. Logout (Clear Token)
```
POST /api/v1/auth/logout
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

### Blog Routes

#### 4. Create Blog Post (Protected)
```
POST /api/v1/post/create
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is a detailed blog post content that must be at least 10 characters long."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "title": "My First Post",
    "content": "This is a detailed blog post content...",
    "likes": [],
    "comments": [],
    "createdAt": "2026-03-24T10:30:00.000Z"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "title", "message": "Title must be at least 3 characters" }
  ]
}
```

**No Token (401):**
```json
{
  "success": false,
  "message": "No token provided. Please login."
}
```

#### 5. Get All Blogs
```
GET /api/v1/post/getAll
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "My First Post",
      "content": "Blog content here...",
      "likes": [
        { "_id": "507f1f77bcf86cd799439013", "user": "User1" }
      ],
      "comments": [
        { "_id": "507f1f77bcf86cd799439014", "user": "User2", "body": "Great post!" }
      ]
    }
  ]
}
```

**No Blogs Found (404):**
```json
{
  "success": false,
  "message": "No blogs found",
  "data": []
}
```

---

### Comment Routes

#### 6. Add Comment to Post (Protected)
```
POST /api/v1/comment/create
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "post": "507f1f77bcf86cd799439012",
  "user": "John Doe",
  "body": "This is a great blog post!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "commentId": "507f1f77bcf86cd799439015",
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "My First Post",
      "comments": [
        { "_id": "507f1f77bcf86cd799439015", "user": "John Doe", "body": "This is a great blog post!" }
      ]
    }
  }
}
```

**Post Not Found (404):**
```json
{
  "success": false,
  "message": "Post not found"
}
```

---

### Like/Unlike Routes

#### 7. Like a Post (Protected)
```
POST /api/v1/likes/like
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "post": "507f1f77bcf86cd799439012",
  "user": "John Doe"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Post liked successfully",
  "data": {
    "likeId": "507f1f77bcf86cd799439016",
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "likes": [
        { "_id": "507f1f77bcf86cd799439016", "user": "John Doe" }
      ]
    }
  }
}
```

**Already Liked (409):**
```json
{
  "success": false,
  "message": "User has already liked this post"
}
```

#### 8. Unlike a Post (Protected)
```
POST /api/v1/likes/unlike
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "post": "507f1f77bcf86cd799439012",
  "like": "507f1f77bcf86cd799439016"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Post unliked successfully",
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "likes": []
    }
  }
}
```

**Like Not Found (404):**
```json
{
  "success": false,
  "message": "Like not found"
}
```

---

## HTTP Status Codes Used

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request (GET, POST with no creation) |
| 201 | Created | Resource created successfully (Signup, create post, etc.) |
| 400 | Bad Request | Validation failed, missing fields |
| 401 | Unauthorized | Invalid/missing token, invalid credentials |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already exists, user already liked |
| 500 | Server Error | Database error, server exception |

---

## Input Validation Rules

### Signup
- **name**: Required, minimum 2 characters
- **email**: Valid email format, unique in database
- **password**: Minimum 6 characters
- **confirmPassword**: Must match password

### Login
- **email**: Valid email format
- **password**: Required

### Create Blog
- **title**: Required, minimum 3 characters
- **content**: Required, minimum 10 characters

### Comment
- **post**: Valid MongoDB ID (ObjectId)
- **user**: Required
- **body**: Required, minimum 1 character

### Like/Unlike
- **post**: Valid MongoDB ID (ObjectId)
- **user**: Required

---

## Error Handling

All endpoints include:
- ✅ Input validation before processing
- ✅ Try-catch blocks for async operations
- ✅ Descriptive error messages
- ✅ Proper HTTP status codes
- ✅ Console error logging
- ✅ Consistent JSON response format

**Standard Error Response:**
```json
{
  "success": false,
  "message": "Human readable error message",
  "error": "Detailed error info (development)"
}
```

---

## Project Structure

```
blog-bd/
├── config/       → Database configuration
├── controllers/  → Business logic (auth, blogs, comments, likes)
├── middleware/   → Auth & validation middleware
├── model/        → MongoDB schemas (User, Blog, Comment, Like)
├── routes/       → API route definitions
├── server.js     → Express app setup & entry point
└── package.json  → Dependencies & scripts
```

---

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:4000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Blog (with token)
```bash
curl -X POST http://localhost:4000/api/v1/post/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "content": "This is a detailed blog post content with more than 10 characters."
  }'
```

---

## Database Schema

- **User** - name, email, password (hashed), createdAt
- **Blog** - title, content, likes array, comments array
- **Comment** - post (ref), user, body
- **Like** - post (ref), user

