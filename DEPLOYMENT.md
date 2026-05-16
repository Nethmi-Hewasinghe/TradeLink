# Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying your Service Request Board to production using:
- **Frontend:** Vercel (recommended for Next.js)
- **Backend:** Render (free tier available)
- **Database:** MongoDB Atlas (already set up)

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Application works locally
- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables documented
- [ ] MongoDB Atlas is set up
- [ ] Code is pushed to GitHub
- [ ] .gitignore is properly configured
- [ ] Sensitive data is not in code

## 📦 Step 1: Prepare Your Code

### 1.1 Initialize Git Repository (if not done)

```bash
cd service-request-board
git init
git add .
git commit -m "Initial commit: Service Request Board"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name it: `service-request-board`
4. Don't initialize with README (we already have one)
5. Click "Create Repository"

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/service-request-board.git
git branch -M main
git push -u origin main
```

## 🗄️ Step 2: MongoDB Atlas Configuration

### 2.1 Update Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Network Access" in left sidebar
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

**Note:** For production, you should whitelist specific IPs of your hosting providers.

### 2.2 Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Keep it handy for backend deployment

## 🖥️ Step 3: Deploy Backend (Render)

### 3.1 Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 3.2 Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `service-request-board` repository

### 3.3 Configure Web Service

**Basic Settings:**
- **Name:** `service-request-board-api` (or your choice)
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select "Free" tier (or paid if needed)

### 3.4 Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/service-request-board?retryWrites=true&w=majority
NODE_ENV=production
```

**Important:** Use your actual MongoDB connection string!

### 3.5 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://service-request-board-api.onrender.com`
4. Test it: `https://your-app.onrender.com/api/health`

### 3.6 Verify Backend

```bash
curl https://your-app.onrender.com/api/health
```

Expected response:
```json
{"success":true,"message":"Server is running"}
```

## 🌐 Step 4: Deploy Frontend (Vercel)

### 4.1 Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

### 4.2 Import Project

1. Click "Add New..." → "Project"
2. Import your `service-request-board` repository
3. Click "Import"

### 4.3 Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** Click "Edit" → Select `frontend`

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)
- Install Command: `npm install` (auto-filled)

### 4.4 Add Environment Variables

Click "Environment Variables"

Add:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

**Important:** Replace with your actual Render backend URL!

### 4.5 Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://service-request-board.vercel.app`

### 4.6 Verify Frontend

1. Open your Vercel URL in browser
2. Check that jobs load
3. Try creating a new job
4. Verify all features work

## 🔧 Step 5: Post-Deployment Configuration

### 5.1 Update Backend CORS (if needed)

If you get CORS errors, update `backend/src/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'
  ]
}));
```

Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the changes.

### 5.2 Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**Render:**
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Follow DNS configuration instructions

## 🧪 Step 6: Test Production Deployment

### 6.1 Functional Testing

- [ ] Home page loads
- [ ] Jobs are displayed
- [ ] Can create new job
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can delete job
- [ ] Filters work
- [ ] Search works
- [ ] Mobile responsive

### 6.2 Performance Testing

- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] No console errors
- [ ] Images load properly
- [ ] Smooth animations

### 6.3 Browser Testing

Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## 📊 Step 7: Monitoring

### 7.1 Render Monitoring

- View logs: Dashboard → Logs
- Monitor metrics: Dashboard → Metrics
- Set up alerts: Dashboard → Settings → Notifications

### 7.2 Vercel Monitoring

- View analytics: Dashboard → Analytics
- Check deployment logs: Dashboard → Deployments → View Logs
- Monitor performance: Dashboard → Speed Insights

### 7.3 MongoDB Atlas Monitoring

- View metrics: Dashboard → Metrics
- Check connections: Dashboard → Metrics → Connections
- Set up alerts: Dashboard → Alerts

## 🔄 Step 8: Continuous Deployment

Both Vercel and Render support automatic deployments:

### Auto-Deploy on Git Push

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel and Render will automatically deploy

### Branch Deployments

**Vercel:**
- Every branch gets a preview URL
- Main branch deploys to production

**Render:**
- Configure in Settings → Build & Deploy
- Set up preview environments

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- Check Render logs
- Verify MONGO_URI is correct
- Check Node version compatibility

**Problem:** Database connection fails
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has permissions

**Problem:** API returns 500 errors
- Check Render logs for error details
- Verify environment variables
- Test endpoints locally first

### Frontend Issues

**Problem:** Frontend can't connect to backend
- Verify NEXT_PUBLIC_API_URL is correct
- Check browser console for CORS errors
- Ensure backend is running

**Problem:** Environment variables not working
- Ensure they start with NEXT_PUBLIC_
- Redeploy after adding variables
- Check Vercel deployment logs

**Problem:** Build fails
- Check Vercel build logs
- Verify all dependencies are in package.json
- Test build locally: `npm run build`

## 📈 Performance Optimization

### Backend Optimization

1. **Enable Compression:**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add Caching:**
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});
```

3. **Database Indexing:**
```javascript
jobRequestSchema.index({ category: 1, status: 1 });
```

### Frontend Optimization

1. **Image Optimization:** Use Next.js Image component
2. **Code Splitting:** Already handled by Next.js
3. **Lazy Loading:** Implement for heavy components

## 🔐 Security Checklist

- [ ] Environment variables are secure
- [ ] No sensitive data in code
- [ ] CORS is properly configured
- [ ] Input validation is in place
- [ ] MongoDB connection is secure
- [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] Rate limiting (consider adding)
- [ ] Error messages don't expose sensitive info

## 💰 Cost Estimation

### Free Tier Limits

**Render Free Tier:**
- 750 hours/month
- Sleeps after 15 min inactivity
- 512 MB RAM
- Shared CPU

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared RAM
- No backup

### Upgrade Considerations

Upgrade when:
- Traffic exceeds free tier limits
- Need faster response times
- Require 24/7 uptime
- Need more storage
- Require backups

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas configured
- [ ] Backend deployed to Render
- [ ] Backend environment variables set
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] Frontend loads successfully
- [ ] All features tested in production
- [ ] CORS configured correctly
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up
- [ ] Documentation updated with URLs

## 🎉 Success!

Your Service Request Board is now live!

**Production URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`
- API Docs: `https://your-api.onrender.com/api/health`

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Congratulations on deploying your application!** 🚀
