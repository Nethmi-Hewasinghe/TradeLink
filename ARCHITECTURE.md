# Application Architecture

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Pages (App Router)                 │  │
│  │  • Home (/)                                          │  │
│  │  • New Job (/new-job)                               │  │
│  │  • Job Detail (/jobs/[id])                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │              Components (Reusable)                    │  │
│  │  • JobCard      • FilterBar    • LoadingSpinner     │  │
│  │  • EmptyState   • Toast                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │              Services (API Layer)                     │  │
│  │  • api.js - Axios HTTP client                        │  │
│  │  • getAllJobs()  • createJob()                       │  │
│  │  • getJobById()  • updateJobStatus()                 │  │
│  │  • deleteJob()                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API Calls
                         │ http://localhost:5000/api
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   BACKEND (Express.js)                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Middleware Layer                     │  │
│  │  • CORS          • JSON Parser                       │  │
│  │  • Error Handler • 404 Handler                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │                   Routes Layer                        │  │
│  │  • /api/jobs (GET, POST)                            │  │
│  │  • /api/jobs/:id (GET, PATCH, DELETE)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │                Controllers Layer                      │  │
│  │  • getAllJobs()      • createJob()                   │  │
│  │  • getJobById()      • updateJobStatus()             │  │
│  │  • deleteJob()                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │                   Models Layer                        │  │
│  │  • JobRequest (Mongoose Schema)                      │  │
│  │    - title, description, category                    │  │
│  │    - location, contactName, contactEmail             │  │
│  │    - status, timestamps                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Mongoose ODM
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   DATABASE (MongoDB Atlas)                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Collection: jobRequests                  │  │
│  │                                                       │  │
│  │  Document Structure:                                 │  │
│  │  {                                                   │  │
│  │    _id: ObjectId,                                    │  │
│  │    title: String,                                    │  │
│  │    description: String,                              │  │
│  │    category: String,                                 │  │
│  │    location: String,                                 │  │
│  │    contactName: String,                              │  │
│  │    contactEmail: String,                             │  │
│  │    status: String,                                   │  │
│  │    createdAt: Date,                                  │  │
│  │    updatedAt: Date                                   │  │
│  │  }                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Creating a New Job

```
User fills form
      │
      ▼
Frontend validates input
      │
      ▼
POST /api/jobs
      │
      ▼
Backend validates data
      │
      ▼
Mongoose creates document
      │
      ▼
MongoDB stores data
      │
      ▼
Backend returns created job
      │
      ▼
Frontend shows success toast
      │
      ▼
Redirect to home page
```

### Viewing Jobs

```
User visits home page
      │
      ▼
Frontend calls getAllJobs()
      │
      ▼
GET /api/jobs?filters
      │
      ▼
Backend queries MongoDB
      │
      ▼
Mongoose returns documents
      │
      ▼
Backend formats response
      │
      ▼
Frontend renders job cards
      │
      ▼
User sees job list
```

### Updating Job Status

```
User selects new status
      │
      ▼
Frontend validates change
      │
      ▼
PATCH /api/jobs/:id
      │
      ▼
Backend validates status
      │
      ▼
Mongoose updates document
      │
      ▼
MongoDB saves changes
      │
      ▼
Backend returns updated job
      │
      ▼
Frontend updates UI
      │
      ▼
User sees success message
```

## 📦 Component Architecture

### Frontend Component Hierarchy

```
App (layout.js)
│
├── Navigation Bar
│   ├── Logo/Title
│   └── "Post New Job" Button
│
└── Main Content
    │
    ├── Home Page (/)
    │   ├── Page Header
    │   ├── FilterBar Component
    │   │   ├── Search Input
    │   │   ├── Category Dropdown
    │   │   └── Status Dropdown
    │   │
    │   └── Job Grid
    │       └── JobCard Component (repeated)
    │           ├── Category Icon
    │           ├── Status Badge
    │           ├── Title
    │           ├── Description
    │           └── Location
    │
    ├── New Job Page (/new-job)
    │   ├── Page Header
    │   └── Job Form
    │       ├── Title Input
    │       ├── Description Textarea
    │       ├── Category Select
    │       ├── Location Input
    │       ├── Contact Name Input
    │       ├── Contact Email Input
    │       └── Submit/Cancel Buttons
    │
    └── Job Detail Page (/jobs/[id])
        ├── Back Button
        ├── Job Information
        │   ├── Title & Category
        │   ├── Status Badge
        │   ├── Description
        │   ├── Location
        │   └── Contact Info
        │
        ├── Status Update Section
        │   ├── Status Dropdown
        │   └── Update Button
        │
        └── Delete Section
            └── Delete Button
                └── Confirmation Modal
```

## 🗄️ Database Schema

### JobRequest Collection

```javascript
{
  // Auto-generated
  _id: ObjectId("507f1f77bcf86cd799439011"),
  
  // Required fields
  title: "Kitchen Sink Repair",
  description: "Leaking sink needs immediate attention",
  category: "Plumbing", // Enum: Plumbing, Electrical, Painting, Joinery
  
  // Optional fields
  location: "Manchester, UK",
  contactName: "John Doe",
  contactEmail: "john@example.com", // Validated format
  
  // Status field
  status: "Open", // Enum: Open, In Progress, Closed (default: Open)
  
  // Auto-generated timestamps
  createdAt: ISODate("2026-05-16T10:30:00Z"),
  updatedAt: ISODate("2026-05-16T10:30:00Z")
}
```

### Indexes

```javascript
// Recommended indexes for performance
{
  category: 1,
  status: 1
}

{
  createdAt: -1
}
```

## 🔌 API Architecture

### RESTful Endpoints

```
┌─────────────────────────────────────────────────────────┐
│                    API Routes                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  GET    /api/jobs                                       │
│         ├─ Query: ?category=Plumbing                    │
│         ├─ Query: ?status=Open                          │
│         └─ Query: ?search=kitchen                       │
│         Response: { success, count, data: [...] }       │
│                                                          │
│  GET    /api/jobs/:id                                   │
│         Response: { success, data: {...} }              │
│                                                          │
│  POST   /api/jobs                                       │
│         Body: { title, description, category, ... }     │
│         Response: { success, data: {...} }              │
│                                                          │
│  PATCH  /api/jobs/:id                                   │
│         Body: { status }                                │
│         Response: { success, data: {...} }              │
│                                                          │
│  DELETE /api/jobs/:id                                   │
│         Response: { success, message, data: {} }        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* job object */ },
  "count": 10  // for list endpoints
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔐 Security Architecture

### Frontend Security
- Input validation before API calls
- Email format validation
- XSS prevention (React auto-escaping)
- Environment variables for API URL

### Backend Security
- CORS enabled
- Input validation
- Email format validation
- MongoDB injection prevention (Mongoose)
- Error messages don't expose internals
- Environment variables for secrets

### Database Security
- Connection string in environment variables
- MongoDB Atlas network access control
- User authentication required
- Encrypted connections (TLS)

## 🚀 Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────┐
│                    USERS (Internet)                      │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────┐
│                  VERCEL (Frontend)                       │
│  • CDN Distribution                                      │
│  • Automatic HTTPS                                       │
│  • Edge Network                                          │
│  • Next.js Optimizations                                 │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ REST API (HTTPS)
                         │
┌────────────────────────▼────────────────────────────────┐
│                  RENDER (Backend)                        │
│  • Node.js Runtime                                       │
│  • Automatic HTTPS                                       │
│  • Health Checks                                         │
│  • Auto-deploy from Git                                  │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ MongoDB Protocol (TLS)
                         │
┌────────────────────────▼────────────────────────────────┐
│              MONGODB ATLAS (Database)                    │
│  • Managed Database                                      │
│  • Automatic Backups                                     │
│  • Monitoring                                            │
│  • Global Distribution                                   │
└──────────────────────────────────────────────────────────┘
```

## 📊 Technology Stack Details

### Frontend Stack
```
Next.js 14
  ├── React 18 (UI Library)
  ├── Tailwind CSS (Styling)
  ├── Axios (HTTP Client)
  └── App Router (Routing)
```

### Backend Stack
```
Node.js
  ├── Express.js (Web Framework)
  ├── Mongoose (ODM)
  ├── dotenv (Environment Variables)
  └── cors (Cross-Origin Resource Sharing)
```

### Database Stack
```
MongoDB Atlas
  ├── Cloud-hosted MongoDB
  ├── Automatic Scaling
  ├── Built-in Security
  └── Monitoring Tools
```

## 🔄 Request/Response Cycle

### Complete Flow Example

```
1. User Action
   └─> Click "Create Job" button

2. Frontend Processing
   ├─> Validate form inputs
   ├─> Show loading state
   └─> Call createJob() from api.js

3. HTTP Request
   ├─> Method: POST
   ├─> URL: http://localhost:5000/api/jobs
   ├─> Headers: Content-Type: application/json
   └─> Body: { title, description, category, ... }

4. Backend Processing
   ├─> CORS middleware checks origin
   ├─> JSON parser parses body
   ├─> Route matches /api/jobs POST
   ├─> Controller validates input
   ├─> Mongoose creates document
   └─> MongoDB stores data

5. HTTP Response
   ├─> Status: 201 Created
   ├─> Headers: Content-Type: application/json
   └─> Body: { success: true, data: {...} }

6. Frontend Processing
   ├─> Parse response
   ├─> Show success toast
   ├─> Hide loading state
   └─> Redirect to home page

7. User Feedback
   └─> See success message and new job in list
```

## 🎯 Design Patterns Used

### Frontend Patterns
- **Component-Based Architecture** - Reusable UI components
- **Service Layer Pattern** - Centralized API calls
- **Container/Presentational** - Smart and dumb components
- **Hooks Pattern** - useState, useEffect for state management

### Backend Patterns
- **MVC Pattern** - Model-View-Controller separation
- **Middleware Pattern** - Request processing pipeline
- **Repository Pattern** - Data access abstraction (Mongoose)
- **Error Handling Pattern** - Centralized error handling

### API Patterns
- **RESTful Design** - Resource-based URLs
- **CRUD Operations** - Create, Read, Update, Delete
- **Query Parameters** - Filtering and searching
- **Status Codes** - Proper HTTP status codes

## 📈 Scalability Considerations

### Current Architecture
- Suitable for: Small to medium applications
- Concurrent users: 100-1000
- Database size: Up to 100,000 jobs

### Future Scaling Options
1. **Caching Layer** - Redis for frequently accessed data
2. **Load Balancing** - Multiple backend instances
3. **Database Sharding** - Horizontal scaling
4. **CDN** - Static asset distribution
5. **Microservices** - Split into smaller services

---

**This architecture provides a solid foundation for a production-ready application!** 🏗️
