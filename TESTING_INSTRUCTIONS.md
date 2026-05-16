# Testing Instructions

## Running Unit Tests

### Backend Tests

The backend includes comprehensive unit tests using Jest and Supertest.

#### Install Dependencies (if not already done)
```bash
cd backend
npm install
```

#### Run Tests

**Run all tests once:**
```bash
npm run test:once
```

**Run tests in watch mode:**
```bash
npm test
```

#### Test Coverage

The tests cover:

1. **Authentication Tests** (`src/tests/auth.test.js`)
   - User registration
   - User login
   - Get current user
   - Invalid credentials
   - Missing fields
   - Duplicate email

2. **Job API Tests** (`src/tests/jobs.test.js`)
   - Get all jobs
   - Filter jobs by category
   - Search jobs by keyword
   - Get single job
   - Create job (with authentication)
   - Update job status (with authentication)
   - Delete job (with authentication)
   - Unauthorized access attempts

#### Test Database

Tests use a separate test database to avoid affecting your development data.

Set test database URI in `.env`:
```
MONGO_URI_TEST=mongodb://localhost:27017/service-request-board-test
```

Or tests will default to local MongoDB.

#### Expected Output

```
PASS  src/tests/auth.test.js
  Auth API Endpoints
    POST /api/auth/register
      ✓ should register a new user (XXXms)
      ✓ should return 400 for duplicate email (XXms)
      ✓ should return 400 for missing fields (XXms)
    POST /api/auth/login
      ✓ should login with valid credentials (XXms)
      ✓ should return 401 for invalid credentials (XXms)
    GET /api/auth/me
      ✓ should get current user when authenticated (XXms)
      ✓ should return 401 when not authenticated (XXms)

PASS  src/tests/jobs.test.js
  Job API Endpoints
    GET /api/jobs
      ✓ should get all jobs (XXms)
      ✓ should filter jobs by category (XXms)
      ✓ should search jobs by title (XXms)
    GET /api/jobs/:id
      ✓ should get a single job by id (XXms)
      ✓ should return 404 for non-existent job (XXms)
    POST /api/jobs
      ✓ should create a new job when authenticated (XXms)
      ✓ should return 401 when not authenticated (XXms)
      ✓ should return 400 for missing required fields (XXms)
    PATCH /api/jobs/:id
      ✓ should update job status when authenticated (XXms)
      ✓ should return 401 when not authenticated (XXms)
    DELETE /api/jobs/:id
      ✓ should delete job when authenticated (XXms)
      ✓ should return 401 when not authenticated (XXms)

Test Suites: 2 passed, 2 total
Tests:       19 passed, 19 total
```

## Manual Testing

### 1. Test Authentication Flow

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

Save the token from the response.

### 2. Test Protected Routes

**Create Job (with token):**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Job","description":"Test","category":"Plumbing"}'
```

**Create Job (without token - should fail):**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Job","description":"Test","category":"Plumbing"}'
```

### 3. Test Search Functionality

```bash
curl "http://localhost:5000/api/jobs?search=kitchen"
```

### 4. Test Filters

```bash
curl "http://localhost:5000/api/jobs?category=Plumbing&status=Open"
```

## Frontend Testing

### Manual UI Testing

1. **Start the application:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

2. **Test Registration:**
   - Go to http://localhost:3000/register
   - Fill in name, email, password
   - Click Register
   - Should redirect to home page
   - Should see "Welcome, [name]" in navigation

3. **Test Login:**
   - Click Logout
   - Go to http://localhost:3000/login
   - Enter email and password
   - Click Login
   - Should redirect to home page

4. **Test Protected Actions:**
   - Try to create a job without logging in
   - Should see error message
   - Login first
   - Create a job - should work
   - Update job status - should work
   - Delete job - should work

5. **Test Search:**
   - Enter text in search box
   - Jobs should filter in real-time

6. **Test Filters:**
   - Select category dropdown
   - Select status dropdown
   - Jobs should filter accordingly

## Troubleshooting Tests

### Tests Fail to Connect to Database

**Solution:** Make sure MongoDB is running or use MongoDB Atlas URI

### Port Already in Use

**Solution:** Stop other instances of the server

### Tests Timeout

**Solution:** Increase timeout in jest.config.js:
```javascript
module.exports = {
  testTimeout: 10000, // 10 seconds
};
```

### Module Not Found Errors

**Solution:** Run `npm install` in backend directory

## Continuous Integration

To run tests in CI/CD:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install
      - run: cd backend && npm run test:once
        env:
          MONGO_URI_TEST: ${{ secrets.MONGO_URI_TEST }}
          JWT_SECRET: test_secret
```

---

**All tests passing = Ready for deployment!** ✅
