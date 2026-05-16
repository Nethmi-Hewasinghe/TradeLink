# Installation Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)

Check your versions:
```bash
node --version
npm --version
```

## Step-by-Step Installation

### 1. Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Create a new cluster (free tier M0)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)
7. Replace `<password>` with your actual database user password
8. Keep this string handy for the next steps

### 2. Install Backend

Open a terminal and navigate to the backend directory:

```bash
cd service-request-board/backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit the `.env` file and add your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/service-request-board?retryWrites=true&w=majority
```

**Important:** Replace the entire `MONGO_URI` value with your actual connection string from MongoDB Atlas.

### 3. Seed the Database (Optional but Recommended)

This will add 10 sample jobs to your database:

```bash
npm run seed
```

You should see:
```
MongoDB Connected: cluster...
Existing jobs cleared
Sample jobs inserted successfully
10 jobs added to database
```

### 4. Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: cluster...
```

**Keep this terminal open!** The backend needs to keep running.

### 5. Install Frontend

Open a **NEW terminal** (keep the backend running) and navigate to the frontend directory:

```bash
cd service-request-board/frontend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
# Windows
copy .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

The `.env.local` file should contain:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note:** If your backend is running on a different port, update the URL accordingly.

### 6. Start Frontend Server

```bash
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### 7. Open the Application

Open your web browser and go to:
```
http://localhost:3000
```

You should see the Service Request Board home page with jobs (if you ran the seed script).

## Verification Checklist

 **Backend Running**
- Terminal shows "Server running on port 5000"
- Terminal shows "MongoDB Connected"
- No error messages

 **Frontend Running**
- Terminal shows "ready started server"
- No compilation errors

 **Application Working**
- Browser opens to http://localhost:3000
- Home page loads
- Jobs are displayed (if seeded)
- No console errors (press F12 to check)

## Common Issues and Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check your MongoDB URI in `.env` file
2. Ensure password is correct (no special characters that need encoding)
3. Check MongoDB Atlas IP whitelist:
   - Go to MongoDB Atlas
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows all IPs - for development only)

### Issue: "Port 5000 already in use"

**Solution:**
1. Change port in backend `.env` file:
   ```
   PORT=5001
   ```
2. Update frontend `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```
3. Restart both servers

### Issue: "Port 3000 already in use"

**Solution:**
1. Kill the process using port 3000, or
2. Start frontend on different port:
   ```bash
   npm run dev -- -p 3001
   ```
3. Open browser to http://localhost:3001

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Frontend can't connect to backend

**Solution:**
1. Verify backend is running (check terminal)
2. Check `.env.local` has correct API URL
3. Check browser console for CORS errors
4. Restart both servers

### Issue: "npm: command not found"

**Solution:**
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation
- Verify with `node --version`

## MongoDB Atlas IP Whitelist Setup

If you see connection errors:

1. Go to MongoDB Atlas dashboard
2. Click "Network Access" in left sidebar
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere"
5. Click "Confirm"
6. Wait 1-2 minutes for changes to apply
7. Restart your backend server

## Testing the Installation

### Test Backend API

Open a new terminal and run:

```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri http://localhost:5000/api/health

# Mac/Linux
curl http://localhost:5000/api/health
```

Expected response:
```json
{"success":true,"message":"Server is running"}
```

### Test Frontend

1. Open http://localhost:3000
2. Click "Post New Job"
3. Fill out the form
4. Submit
5. Verify job appears on home page

## Next Steps

Once everything is running:

1.  Browse existing jobs
2.  Create a new job
3.  Click on a job to view details
4.  Update job status
5.  Test search and filters
6.  Delete a job

## Development Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb+srv://... |

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:5000/api |

## Getting Help

If you encounter issues:

1. Check the error message carefully
2. Review this installation guide
3. Check SETUP_GUIDE.md for quick start
4. Review TESTING_GUIDE.md for testing procedures
5. Check MongoDB Atlas connection
6. Verify all environment variables
7. Restart both servers

## Success!

If you see the home page with jobs, congratulations! 🎉

Your Service Request Board is now running locally.

**Backend:** http://localhost:5000  
**Frontend:** http://localhost:3000  
**API Docs:** See README.md

---

**Ready to start developing!** 🚀
