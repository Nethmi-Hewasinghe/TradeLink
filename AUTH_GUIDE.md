# Authentication Guide

## JWT Authentication Implementation

This application now includes JWT-based authentication to protect certain routes.

## Features

✅ **User Registration** - Create new user accounts  
✅ **User Login** - Authenticate with email and password  
✅ **Protected Routes** - Only authenticated users can create, update, or delete jobs  
✅ **Token-based Auth** - JWT tokens for secure authentication  
✅ **Password Hashing** - Bcrypt for secure password storage  

## API Endpoints

### Authentication Endpoints

#### Register New User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Protected Job Endpoints

The following endpoints now require authentication:

- **POST /api/jobs** - Create new job (requires token)
- **PATCH /api/jobs/:id** - Update job status (requires token)
- **DELETE /api/jobs/:id** - Delete job (requires token)

Public endpoints (no authentication required):
- **GET /api/jobs** - Get all jobs
- **GET /api/jobs/:id** - Get single job

## Using Authentication

### Frontend

1. **Register/Login:**
   - Navigate to `/register` or `/login`
   - Fill in the form
   - Token is automatically stored in localStorage

2. **Making Authenticated Requests:**
   - Token is automatically added to all requests via axios interceptor
   - No manual token handling needed

3. **Logout:**
   - Click "Logout" button in navigation
   - Token is removed from localStorage

### Backend

1. **Protecting Routes:**
```javascript
const { protect } = require('../middleware/auth');

router.post('/jobs', protect, createJob);
```

2. **Accessing User in Controller:**
```javascript
const createJob = async (req, res) => {
  const userId = req.user.id; // Available after protect middleware
  // ...
};
```

## Environment Variables

Add to backend `.env`:
```
JWT_SECRET=your_secret_key_here_change_in_production
```

## Testing Authentication

### Using Postman/Insomnia

1. **Register a user:**
```
POST http://localhost:5000/api/auth/register
Body: { "name": "Test", "email": "test@test.com", "password": "test123" }
```

2. **Copy the token from response**

3. **Use token for protected routes:**
```
POST http://localhost:5000/api/jobs
Headers: Authorization: Bearer <your_token>
Body: { "title": "Test Job", "description": "Test", "category": "Plumbing" }
```

## Security Features

✅ **Password Hashing** - Passwords are hashed with bcrypt before storage  
✅ **JWT Tokens** - Secure token-based authentication  
✅ **Token Expiration** - Tokens expire after 30 days  
✅ **Protected Routes** - Middleware validates tokens  
✅ **No Password in Response** - Passwords never returned in API responses  

## Frontend Pages

- `/register` - User registration page
- `/login` - User login page
- `/` - Home page (shows login/register or user info)
- `/new-job` - Create job (requires authentication)
- `/jobs/[id]` - Job details (update/delete require authentication)

## Error Handling

### 401 Unauthorized
Returned when:
- No token provided
- Invalid token
- Expired token
- User not found

### 400 Bad Request
Returned when:
- Missing required fields
- Invalid email format
- Password too short
- User already exists

## Notes

- Tokens are stored in localStorage (client-side)
- Tokens are sent in Authorization header as Bearer token
- Public routes (GET jobs) don't require authentication
- Create, update, delete operations require authentication
- Frontend automatically handles token storage and sending

## Running Tests

```bash
cd backend
npm test
```

Tests include:
- User registration
- User login
- Protected route access
- Token validation
- Job CRUD with authentication

---

**Authentication is now fully integrated!** 🔐
