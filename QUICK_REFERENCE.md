# Quick Reference Card

## 🚀 Start Commands

```bash
# Backend
cd backend && npm run dev

# Frontend  
cd frontend && npm run dev
```

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Base:** http://localhost:5000/api

## 📡 API Endpoints

```bash
GET    /api/jobs              # Get all jobs
GET    /api/jobs?category=X   # Filter by category
GET    /api/jobs?status=X     # Filter by status
GET    /api/jobs?search=X     # Search jobs
GET    /api/jobs/:id          # Get single job
POST   /api/jobs              # Create job
PATCH  /api/jobs/:id          # Update status
DELETE /api/jobs/:id          # Delete job
```

## 📝 Create Job Request Body

```json
{
  "title": "Kitchen Sink Repair",
  "description": "Leaking sink needs fixing",
  "category": "Plumbing",
  "location": "London, UK",
  "contactName": "John Doe",
  "contactEmail": "john@example.com"
}
```

## 🎨 Categories

- Plumbing 🔧
- Electrical ⚡
- Painting 🎨
- Joinery 🪚

## 📊 Status Values

- Open (default)
- In Progress
- Closed

## 🗂️ Project Structure

```
service-request-board/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/jobController.js
│   │   ├── middleware/errorHandler.js
│   │   ├── models/JobRequest.js
│   │   ├── routes/jobRoutes.js
│   │   ├── utils/seed.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── jobs/[id]/page.js
    │   ├── new-job/page.js
    │   ├── page.js
    │   └── layout.js
    ├── components/
    ├── services/api.js
    └── package.json
```

## 🔧 Useful Commands

```bash
# Seed database
cd backend && npm run seed

# Build frontend
cd frontend && npm run build

# Run production
cd frontend && npm start

# Install dependencies
npm install

# Clear node_modules
rm -rf node_modules && npm install
```

## 🌍 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `backend/src/server.js` | Express server setup |
| `backend/src/models/JobRequest.js` | Mongoose schema |
| `backend/src/controllers/jobController.js` | API logic |
| `frontend/app/page.js` | Home page |
| `frontend/app/new-job/page.js` | Create job form |
| `frontend/app/jobs/[id]/page.js` | Job details |
| `frontend/services/api.js` | API calls |

## 🐛 Debug Tips

```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check MongoDB connection
# Look for "MongoDB Connected" in backend terminal

# Check frontend build
cd frontend && npm run build

# View browser console
# Press F12 in browser

# Check network requests
# F12 → Network tab → Filter by XHR
```

## 📦 Dependencies

### Backend
- express
- mongoose
- dotenv
- cors

### Frontend
- next
- react
- react-dom
- axios
- tailwindcss

## 🎨 Tailwind Classes (Common)

```css
/* Buttons */
bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg

/* Cards */
bg-white rounded-lg shadow-md p-6

/* Inputs */
border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500

/* Status Badges */
bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm
```

## 🔍 Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can view jobs on home page
- [ ] Can create new job
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can delete job
- [ ] Filters work
- [ ] Search works
- [ ] Mobile responsive

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
```

## 🚨 Common Errors

| Error | Solution |
|-------|----------|
| Port in use | Change PORT in .env |
| MongoDB connection failed | Check MONGO_URI |
| Module not found | Run npm install |
| CORS error | Check backend CORS config |
| 404 on API | Check API_URL in .env.local |

## 📚 Documentation Files

- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Quick setup
- `INSTALL.md` - Detailed installation
- `TESTING_GUIDE.md` - Testing procedures
- `FEATURES_CHECKLIST.md` - Feature list
- `PROJECT_SUMMARY.md` - Project overview
- `QUICK_REFERENCE.md` - This file

## 🎓 Code Patterns

### API Call Pattern
```javascript
// services/api.js
export const getJobs = async (filters) => {
  const response = await api.get('/jobs', { params: filters });
  return response.data;
};
```

### Component Pattern
```javascript
'use client';
import { useState, useEffect } from 'react';

export default function Component() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return <div>{/* JSX */}</div>;
}
```

### Controller Pattern
```javascript
const getAll = async (req, res, next) => {
  try {
    const data = await Model.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
```

## 🔐 Security Notes

- CORS enabled for development
- Input validation on backend
- Email format validation
- MongoDB injection prevention (Mongoose)
- Environment variables for secrets

## 🚀 Deployment

### Vercel (Frontend)
```bash
vercel
```

### Render (Backend)
1. Connect GitHub repo
2. Set root: `backend`
3. Add MONGO_URI env var
4. Deploy

## 💡 Pro Tips

1. Use `npm run seed` to reset data
2. Keep both terminals open
3. Check browser console for errors
4. Use MongoDB Compass to view data
5. Test API with Postman/Insomnia
6. Use React DevTools for debugging
7. Enable auto-save in your editor

## 📞 Quick Links

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Tailwind Docs](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Keep this card handy while developing!** 📌
