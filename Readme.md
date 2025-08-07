# Express Server

A simple Node.js Express server with basic API endpoints.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

#### GET /
- Returns welcome message and available endpoints

#### GET /api/health
- Health check endpoint
- Returns server status and uptime

### Authentication Endpoints

#### POST /api/auth/register
- Register a new user
- Required fields: `username`, `email`, `password`
- Returns JWT token and user info
- Example request body:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### POST /api/auth/login
- Login with existing credentials
- Required fields: `email`, `password`
- Returns JWT token and user info
- Example request body:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### GET /api/auth/me
- Get current user information (protected)
- Requires: `Authorization` header with JWT token

### Protected Endpoints (Require JWT Token)

#### GET /api/users
- Returns a list of all registered users
- Requires: `Authorization` header with JWT token

#### POST /api/users
- Creates a new user entry
- Required fields: `name`, `email`
- Requires: `Authorization` header with JWT token

#### GET /api/posts
- Returns all posts
- Requires: `Authorization` header with JWT token

#### POST /api/posts
- Creates a new post
- Required fields: `title`, `content`
- Requires: `Authorization` header with JWT token

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Project dependencies and scripts
├── .env                   # Environment variables (JWT secret, etc.)
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── utils/
│   └── jwt.js            # JWT utility functions
├── public/               # Static files (HTML, CSS, JS)
│   ├── index.html        # Welcome page
│   └── auth-test.html    # Authentication test page
└── README.md             # Project documentation
```

## Features

- Express.js web framework
- JWT Authentication (register, login, protected routes)
- Password hashing with bcrypt
- Protected API endpoints
- Static file serving
- Error handling
- Request logging
- Development mode with auto-restart (nodemon)
- Interactive authentication test page

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Register a new user or login with existing credentials
2. Include the JWT token in the `Authorization` header: `Bearer <token>`
3. The token expires in 24 hours (configurable in `.env`)

### Environment Variables

Create a `.env` file in the root directory with:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
PORT=3000
```

**Important**: Change the `JWT_SECRET` in production!

## Testing

You can test the API endpoints using tools like:
- curl
- Postman
- Thunder Client (VS Code extension)

### Example curl commands:

```bash
# Get welcome message
curl http://localhost:3000/

# Health check
curl http://localhost:3000/api/health

# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get current user (replace TOKEN with actual JWT token)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# Get users (protected - requires token)
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer TOKEN"

# Create a new post (protected - requires token)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My First Post","content":"This is the content of my post"}'
```

### Interactive Testing

Visit `http://localhost:3000/auth-test.html` for an interactive web interface to test all authentication features.
