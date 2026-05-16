const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const JobRequest = require('../models/JobRequest');
const User = require('../models/User');

// Test database connection
beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/service-request-board-test';
  await mongoose.connect(mongoUri);
});

// Clean up database after each test
afterEach(async () => {
  await JobRequest.deleteMany({});
  await User.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Job API Endpoints', () => {
  let authToken;
  let userId;

  // Helper function to create a user and get auth token
  const createUserAndLogin = async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(userData);

    authToken = registerRes.body.data.token;
    userId = registerRes.body.data.id;
    return authToken;
  };

  describe('GET /api/jobs', () => {
    it('should get all jobs', async () => {
      // Create sample jobs
      await JobRequest.create([
        {
          title: 'Test Job 1',
          description: 'Test description 1',
          category: 'Plumbing',
          status: 'Open',
        },
        {
          title: 'Test Job 2',
          description: 'Test description 2',
          category: 'Electrical',
          status: 'Open',
        },
      ]);

      const res = await request(app).get('/api/jobs');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.count).toBe(2);
    });

    it('should filter jobs by category', async () => {
      await JobRequest.create([
        {
          title: 'Plumbing Job',
          description: 'Fix sink',
          category: 'Plumbing',
          status: 'Open',
        },
        {
          title: 'Electrical Job',
          description: 'Fix wiring',
          category: 'Electrical',
          status: 'Open',
        },
      ]);

      const res = await request(app).get('/api/jobs?category=Plumbing');

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].category).toBe('Plumbing');
    });

    it('should search jobs by title', async () => {
      await JobRequest.create([
        {
          title: 'Kitchen Sink Repair',
          description: 'Fix leaking sink',
          category: 'Plumbing',
          status: 'Open',
        },
        {
          title: 'Bathroom Renovation',
          description: 'Complete bathroom remodel',
          category: 'Plumbing',
          status: 'Open',
        },
      ]);

      const res = await request(app).get('/api/jobs?search=kitchen');

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].title).toContain('Kitchen');
    });
  });

  describe('GET /api/jobs/:id', () => {
    it('should get a single job by id', async () => {
      const job = await JobRequest.create({
        title: 'Test Job',
        description: 'Test description',
        category: 'Plumbing',
        status: 'Open',
      });

      const res = await request(app).get(`/api/jobs/${job._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Job');
    });

    it('should return 404 for non-existent job', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/jobs/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job when authenticated', async () => {
      await createUserAndLogin();

      const jobData = {
        title: 'New Job',
        description: 'New job description',
        category: 'Plumbing',
        location: 'London',
        contactName: 'John Doe',
        contactEmail: 'john@example.com',
      };

      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(jobData);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('New Job');
      expect(res.body.data.status).toBe('Open'); // Default status
    });

    it('should return 401 when not authenticated', async () => {
      const jobData = {
        title: 'New Job',
        description: 'New job description',
        category: 'Plumbing',
      };

      const res = await request(app).post('/api/jobs').send(jobData);

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for missing required fields', async () => {
      await createUserAndLogin();

      const jobData = {
        title: 'New Job',
        // Missing description and category
      };

      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(jobData);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PATCH /api/jobs/:id', () => {
    it('should update job status when authenticated', async () => {
      await createUserAndLogin();

      const job = await JobRequest.create({
        title: 'Test Job',
        description: 'Test description',
        category: 'Plumbing',
        status: 'Open',
      });

      const res = await request(app)
        .patch(`/api/jobs/${job._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'In Progress' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('In Progress');
    });

    it('should return 401 when not authenticated', async () => {
      const job = await JobRequest.create({
        title: 'Test Job',
        description: 'Test description',
        category: 'Plumbing',
        status: 'Open',
      });

      const res = await request(app)
        .patch(`/api/jobs/${job._id}`)
        .send({ status: 'In Progress' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/jobs/:id', () => {
    it('should delete job when authenticated', async () => {
      await createUserAndLogin();

      const job = await JobRequest.create({
        title: 'Test Job',
        description: 'Test description',
        category: 'Plumbing',
        status: 'Open',
      });

      const res = await request(app)
        .delete(`/api/jobs/${job._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify job is deleted
      const deletedJob = await JobRequest.findById(job._id);
      expect(deletedJob).toBeNull();
    });

    it('should return 401 when not authenticated', async () => {
      const job = await JobRequest.create({
        title: 'Test Job',
        description: 'Test description',
        category: 'Plumbing',
        status: 'Open',
      });

      const res = await request(app).delete(`/api/jobs/${job._id}`);

      expect(res.statusCode).toBe(401);
    });
  });
});
