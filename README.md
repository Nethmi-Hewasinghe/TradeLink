# TradeLink - Service Request Board

TradeLink is a full-stack web application that allows homeowners to post service requests and tradespeople to browse, manage, and update job requests.

This project was built as a Full-Stack Developer Intern technical assessment.

---

# 🚀 Features

- Create service requests
- Browse all job requests
- View detailed job information
- Update job status
- Delete job requests
- Filter by category and status
- Keyword search functionality
- JWT-based authentication
- Protected routes
- Users must log in before posting or deleting a job request
- Responsive modern UI
- REST API architecture
- Unit testing with Jest

---

# 🛠️ Tech Stack

## Frontend
- Next.js 14
- React
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt

## Testing
- Jest
- Supertest

---

# 📁 Project Structure

```bash
service-request-board/
│
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   ├── render.yaml
│   └── jest.config.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── styles/
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vercel.json
│
├── README.md
├── INSTALL.md
├── TESTING_GUIDE.md
└── ARCHITECTURE.md
```

---

# ⚙️ Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/Nethmi-Hewasinghe/TradeLink.git
cd TradeLink
```

---

# 🔧 Backend Setup

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 4. Start backend server

```bash
npm run dev
```

Backend will run at:

```txt
http://localhost:5000
```

---

# 💻 Frontend Setup

## 1. Navigate to frontend folder

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Update `.env` file

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 4. Start frontend server

```bash
npm run dev
```

Frontend will run at:

```txt
http://localhost:3000
```

---

# 🌱 Database Seeding

A seed script is included to insert sample service requests into the MongoDB database.

Before running the seed command, make sure the backend `.env` file is created and contains a valid MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Navigate to the backend folder:

```bash
cd backend
```

Run the seed script:

```bash
npm run seed
```

This will insert sample job requests into the `jobRequests` collection.

After seeding, start the backend and frontend again:

```bash
npm run dev
```

Then open the frontend:

```txt
http://localhost:3000
```

You should see the sample jobs displayed on the home page.

---

# 📡 API Endpoints

## Jobs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create new job |
| PATCH | `/api/jobs/:id` | Update job status |
| DELETE | `/api/jobs/:id` | Delete job |

---

# 🔍 Query Parameters

| Parameter | Description |
|---|---|
| category | Filter by category |
| status | Filter by job status |
| search | Search title and description |

---

# 🧪 Running Tests

Navigate to backend:

```bash
cd backend
```

Run tests:

```bash
npm test
```

Testing tools used:
- Jest
- Supertest

---

# ⭐ Bonus Features Implemented

- Keyword search functionality
- JWT authentication
- Protected routes
- Authentication required for posting and deleting jobs
- Unit testing with Jest and Supertest
- Database seed script

---

# 🚀 Deployment Configuration

Deployment configuration files are included for:

- Render (`render.yaml`)
- Vercel (`vercel.json`)

The project is currently configured for local development and testing.

---

# 🎨 UI Features

- Responsive design
- Clean modern interface
- Loading spinners
- Toast notifications
- Empty state UI
- Form validation
- Interactive cards and filters

---

# 👨‍💻 Author

Nethmi Hewasinghe

Built as part of a Full-Stack Developer Intern technical assessment.