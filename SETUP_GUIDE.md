# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env and add your MongoDB URI
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/service-request-board

# Seed database with sample data (optional)
npm run seed

# Start backend server
npm run dev
```

Backend will run at: `http://localhost:5000`

### Step 2: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Start frontend server
npm run dev
```

Frontend will run at: `http://localhost:3000`

### Step 3: Test the Application

1. Open browser to `http://localhost:3000`
2. Browse existing jobs (if you ran the seed script)
3. Click "Post New Job" to create a service request
4. Click on any job card to view details
5. Update status and test delete functionality

## 📋 MongoDB Atlas Setup (if needed)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Paste into backend `.env` file as `MONGO_URI`

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected successfully
- [ ] Can view jobs on homepage
- [ ] Can create new job
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can delete job
- [ ] Filters work correctly
- [ ] Search functionality works

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB URI is correct in `.env`
- Ensure port 5000 is not in use
- Run `npm install` again

**Frontend won't start:**
- Check `.env.local` has correct API URL
- Ensure port 3000 is not in use
- Run `npm install` again

**Can't connect to database:**
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Check database user credentials
- Ensure connection string format is correct

**API calls failing:**
- Verify backend is running
- Check browser console for errors
- Ensure CORS is enabled (already configured)

## 📦 Production Deployment

### Backend (Render)
1. Push code to GitHub
2. Create Web Service on Render
3. Set root directory to `backend`
4. Add `MONGO_URI` environment variable
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add `NEXT_PUBLIC_API_URL` environment variable
5. Deploy

## 🎯 Next Steps

- Customize the design colors in `tailwind.config.js`
- Add more categories in the backend model
- Implement user authentication
- Add image upload for jobs
- Create admin dashboard
- Add email notifications

## 💡 Tips

- Use `npm run seed` to reset database with fresh sample data
- Check backend logs for API errors
- Use browser DevTools Network tab to debug API calls
- MongoDB Compass is great for viewing database contents

---

Need help? Check the main README.md for detailed documentation.
