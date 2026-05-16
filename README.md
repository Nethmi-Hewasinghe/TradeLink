# Service Request Board

A full-stack web application that connects homeowners with skilled tradespeople. Homeowners can post service requests (plumbing, electrical, painting, joinery), and tradespeople can browse jobs, view details, update job status, and manage requests.

## 🚀 Features

- **Browse Jobs**: View all service requests with filtering by category and status
- **Search Functionality**: Full-text search across title and description
- **Create Jobs**: Post new service requests with detailed information
- **Job Details**: View complete job information including contact details
- **Status Management**: Update job status (Open, In Progress, Closed)
- **Delete Jobs**: Remove completed or cancelled jobs
- **User Authentication**: JWT-based authentication for secure access
- **Protected Routes**: Only authenticated users can create, update, or delete jobs
- **Responsive Design**: Modern, clean UI that works on all devices
- **Real-time Filtering**: Filter jobs by category, status, and search terms
- **Unit Tests**: Comprehensive test coverage with Jest and Supertest

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React** - UI library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Jest** - Testing framework
- **Supertest** - HTTP testing

## 📁 Project Structure

```
service-request-board/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database connection
│   │   ├── controllers/
│   │   │   └── jobController.js      # Job CRUD operations
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── models/
│   │   │   └── JobRequest.js         # Mongoose schema
│   │   ├── routes/
│   │   │   └── jobRoutes.js          # API routes
│   │   ├── utils/
│   │   │   └── seed.js               # Database seeding script
│   │   └── server.js                 # Express server setup
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── jobs/
│   │   │   └── [id]/
│   │   │       └── page.js           # Job detail page
│   │   ├── new-job/
│   │   │   └── page.js               # Create job page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.js                 # Root layout
│   │   └── page.js                   # Home page
│   │
│   ├── components/
│   │   ├── EmptyState.js             # Empty state UI
│   │   ├── FilterBar.js              # Filter controls
│   │   ├── JobCard.js                # Job card component
│   │   ├── LoadingSpinner.js         # Loading indicator
│   │   └── Toast.js                  # Toast notifications
│   │
│   ├── services/
│   │   └── api.js                    # API service layer
│   │
│   ├── .env.local.example
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/service-request-board?retryWrites=true&w=majority
```

5. (Optional) Seed the database with sample data:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

The backend API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.local.example`:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## 📡 API Endpoints

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs (supports filtering) |
| GET | `/api/jobs/:id` | Get single job by ID |
| POST | `/api/jobs` | Create new job |
| PATCH | `/api/jobs/:id` | Update job status |
| DELETE | `/api/jobs/:id` | Delete job |

### Query Parameters

- `category` - Filter by category (Plumbing, Electrical, Painting, Joinery)
- `status` - Filter by status (Open, In Progress, Closed)
- `search` - Search in title and description

### Example Requests

**Get all open plumbing jobs:**
```
GET /api/jobs?category=Plumbing&status=Open
```

**Search for jobs:**
```
GET /api/jobs?search=kitchen
```

**Create a new job:**
```
POST /api/jobs
Content-Type: application/json

{
  "title": "Kitchen Sink Repair",
  "description": "Leaking sink needs immediate attention",
  "category": "Plumbing",
  "location": "Manchester, UK",
  "contactName": "John Doe",
  "contactEmail": "john@example.com"
}
```

**Update job status:**
```
PATCH /api/jobs/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "status": "In Progress"
}
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with indigo/blue theme
- **Responsive**: Mobile-first design that works on all screen sizes
- **Interactive**: Smooth hover effects and transitions
- **User Feedback**: Toast notifications for all actions
- **Loading States**: Spinners and skeletons for better UX
- **Empty States**: Helpful messages when no data is available
- **Form Validation**: Client-side validation with error messages

## 🚀 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
4. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (or leave default)
5. Deploy

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Set environment variable in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL + `/api`

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Browse existing jobs (if seeded)
4. Click "Post New Job" to create a new service request
5. Click on any job card to view details
6. Update job status from the detail page
7. Delete jobs as needed
8. Test filtering by category and status
9. Try the search functionality

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

This is a technical assessment project. Feel free to fork and modify for your own use.

## 📄 License

ISC

## 👨‍💻 Author

Built as a technical assessment project demonstrating full-stack development skills.

---

**Note**: This application is designed for demonstration purposes. For production use, consider adding:
- Authentication and authorization
- Rate limiting
- Input sanitization
- Comprehensive error logging
- Automated testing
- CI/CD pipeline
- Database backups
- Security headers
- HTTPS enforcement
